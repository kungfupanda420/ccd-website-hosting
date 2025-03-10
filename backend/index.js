require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "peace",
  database: "ccd_sip",
});

db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed:", err);
    return;
  }
  console.log("Connected to MySQL Database ✅");
});

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Ensure the 'uploads' directory exists
const fs = require("fs");
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Fetch filtered mentors
app.post("/filter", (req, res) => {
  const { department, preferred_duration, internship_mode } = req.body;
  // console.log("Filter Data:", department, preferred_duration, internship_mode);
  let query = "SELECT * FROM mentors WHERE 1=1";
  let params = [];

  if (department) {
    query += " AND department = ?";
    params.push(department);
  }
  if (preferred_duration.length) {
    query += ` AND preferred_duration IN (${preferred_duration.map(() => "?").join(",")})`;
    params.push(...preferred_duration);
  }
  if (internship_mode.length) {
    query += ` AND internship_mode IN (${internship_mode.map(() => "?").join(",")})`;
    params.push(...internship_mode);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Database query error");
    }
    res.json(results);
  });
});

// Handle form submission with file uploads
// app.post(
//   "/submit-application",
//   upload.fields([
//     { name: "resume", maxCount: 1 },
//     { name: "statement", maxCount: 1 },
//     { name: "bonafide", maxCount: 1 },
//     { name: "tenthMarksheet", maxCount: 1 },
//     { name: "twelfthMarksheet", maxCount: 1 },
//     { name: "idCard", maxCount: 1 },
//     { name: "photo", maxCount: 1 },
//   ]),
//   (req, res) => {
//     const formData = req.body;
//     const files = req.files;
//     console.log("Form Data in serveer:", formData);
//     console.log("Files in server:", files);

//     if (!formData || Object.keys(formData).length === 0) {
//       return res.status(400).send("No form data received");
//     }

//     // Add file paths to the form data
//     formData.resume = files.resume[0].path;
//     formData.statement = files.statement[0].path;
//     formData.bonafide = files.bonafide[0].path;
//     formData.tenthMarksheet = files.tenthMarksheet[0].path;
//     formData.twelfthMarksheet = files.twelfthMarksheet[0].path;
//     formData.idCard = files.idCard[0].path;
//     formData.photo = files.photo[0].path;
//     formData.agreeToTerms = formData.agreeToTerms === "true" ? 1 : 0;
//     formData.cgpa10 = parseFloat(formData.cgpa10) || 0; // Convert to float or set to 0
//     formData.cgpa12 = parseFloat(formData.cgpa12) || 0;
//     formData.currentSemesterCgpa = parseFloat(formData.currentSemesterCgpa) || 0;


//     const sql = `INSERT INTO summer_internship_applications SET ?`;

//     db.query(sql, formData, (err, result) => {
//       if (err) {
//         console.error("Error submitting application:", err);
//         return res.status(500).send("Error submitting application");
//       }
//       res.status(200).send("Application submitted successfully");
//     });
//   }
// );

app.post(
  "/submit-application",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "statement", maxCount: 1 },
    { name: "bonafide", maxCount: 1 },
    { name: "tenthMarksheet", maxCount: 1 },
    { name: "twelfthMarksheet", maxCount: 1 },
    { name: "idCard", maxCount: 1 },
    { name: "photo", maxCount: 1 },
    { name: "payment",maxCount:1}
  ]),
  (req, res) => {
    try {
      const formData = req.body;
      const files = req.files;

      console.log("Received Form Data:", formData);
      console.log("Received Files:", files);

      if (!formData || Object.keys(formData).length === 0) {
        return res.status(400).send("No form data received");
      }

      // ✅ Ensure files exist before accessing their paths
      formData.resume = files.resume ? files.resume[0].path : null;
      formData.statement = files.statement ? files.statement[0].path : null;
      formData.bonafide = files.bonafide ? files.bonafide[0].path : null;
      formData.tenthMarksheet = files.tenthMarksheet ? files.tenthMarksheet[0].path : null;
      formData.twelfthMarksheet = files.twelfthMarksheet ? files.twelfthMarksheet[0].path : null;
      formData.payment=files.payment?files.payment[0].path:null;
      formData.idCard = files.idCard ? files.idCard[0].path : null;
      formData.photo = files.photo ? files.photo[0].path : null;

      // ✅ Convert boolean & numeric values correctly
      formData.agreeToTerms = formData.agreeToTerms === "true" ? 1 : 0;
      formData.cgpa10 = parseFloat(formData.cgpa10) || 0;
      formData.cgpa12 = parseFloat(formData.cgpa12) || 0;
      formData.currentSemesterCgpa = parseFloat(formData.currentSemesterCgpa) || 0;

      // ✅ Extract newly added fields (internship preferences)
      const {
        selectedDepartment,
        faculty1, duration1, mode1,domain1,title1,remarks1,
        faculty2, duration2, mode2,domain2,title2,remarks2,
        faculty3, duration3, mode3,domain3,title3,remarks3
      } = formData;

      const sql = `
        INSERT INTO summer_internship_applications 
        (name, email, phone, institution, program, department, year, 
         selectedDepartment, faculty1, duration1, mode1,domain1,title1,remarks1, faculty2, duration2, mode2, domain2,title2,remarks2,
         faculty3, duration3, mode3, domain3,title3,remarks3,transactionId,payment, agreeToTerms, 
         cgpa10, board10, cgpa12, board12, currentSemesterCgpa, 
         dateOfBirth, permanentAddress, state, guardianName, relation, 
         guardianPhone, instituteLocation, instituteState, 
         resume, statement, bonafide, tenthMarksheet, twelfthMarksheet, idCard, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)

      `;

      const values = [
        formData.name, formData.email, formData.phone, formData.institution,
        formData.program, formData.department, formData.year,
        selectedDepartment, faculty1, duration1, mode1,domain1,title1,remarks1,
        faculty2, duration2, mode2,domain2,title2,remarks2, faculty3, duration3, mode3,domain3,title3,remarks3,
        formData.transactionId, formData.payment,formData.agreeToTerms,
        formData.cgpa10, formData.board10, formData.cgpa12, formData.board12,
        formData.currentSemesterCgpa, formData.dateOfBirth, formData.permanentAddress,
        formData.state, formData.guardianName, formData.relation, formData.guardianPhone,
        formData.instituteLocation, formData.instituteState,
        formData.resume, formData.statement, formData.bonafide,
        formData.tenthMarksheet, formData.twelfthMarksheet, formData.idCard, formData.photo
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Database Insertion Error:", err);
          return res.status(500).send("Error submitting application");
        }
        res.status(200).send("Application submitted successfully");
      });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).send("Internal server error");
    }
  }
);


// Serve uploaded files
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));