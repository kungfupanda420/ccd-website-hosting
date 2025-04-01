// require("dotenv").config();
// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// // Database Connection Pool
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "placemetuser",
//   password: "PwDmPlacemeter1234",
//   database: "placemetdb",
//   connectionLimit: 10,  // Allow up to 10 concurrent connections
//   waitForConnections: true,
//   queueLimit: 0
// });

// // Handle MySQL Errors & Reconnect
// pool.on('error', (err) => {
//   console.error('MySQL Pool Error:', err);
//   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//     console.warn('Reconnecting MySQL pool...');
//   }
// });

// // Keep MySQL Connection Alive
// setInterval(() => {
//   pool.query('SELECT 1', (err) => {
//     if (err) console.error('MySQL Keep-Alive Error:', err);
//   });
// }, 5 * 60 * 1000); // Every 5 minutes

// // Login API
// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;
//   const adminEmail = process.env.ADMIN_MAIL;
//   const adminPassword = process.env.ADMIN_PASS;

//   if (email === adminEmail && password === adminPassword) {
//     return res.status(200).json({ message: "Login successful!" });
//   } else {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }
// });

// // Fetch Internship Applications
// app.get("/api/internships", (req, res) => {
//   const sql = "SELECT * FROM internship_applications ORDER BY createdAt";
  
//   pool.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching internship applications:", err);
//       return res.status(500).json({ message: "Database query error" });
//     }
//     res.json(results);
//   });
// });

// // Ensure "uploads" directory exists
// const uploadDir = "./uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer Storage for File Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   limits: { fileSize: 100 * 1024 * 1024 }, // Max file size 100MB
//   storage,
// });

// // Fetch Filtered Mentors
// app.post("/filter", (req, res) => {
//   const { department, preferred_duration, internship_mode } = req.body;
//   let query = "SELECT * FROM mentors WHERE 1=1";
//   let params = [];

//   if (department) {
//     query += " AND department = ?";
//     params.push(department);
//   }
//   if (preferred_duration.length) {
//     query += ` AND preferred_duration IN (${preferred_duration.map(() => "?").join(",")})`;
//     params.push(...preferred_duration);
//   }
//   if (internship_mode.length) {
//     query += ` AND internship_mode IN (${internship_mode.map(() => "?").join(",")})`;
//     params.push(...internship_mode);
//   }

//   pool.query(query, params, (err, results) => {
//     if (err) {
//       console.error("Error fetching data:", err);
//       return res.status(500).send("Database query error");
//     }
//     res.json(results);
//   });
// });

// // Handle Internship Application Submission
// app.post(
//   "/submit-application",
//   upload.fields([
//     { name: "docs", maxCount: 1 },
//     { name: "photo", maxCount: 1 },
//     { name: "payment", maxCount: 1 },
//   ]),
//   (req, res) => {
//     try {
//       const formData = req.body;
//       const files = req.files;

//       formData.docs = files.docs ? files.docs[0].path : null;
//       formData.photo = files.photo ? files.photo[0].path : null;
//       formData.payment = files.payment ? files.payment[0].path : null;

//       formData.agreeToTerms = formData.agreeToTerms === "true" ? 1 : 0;
//       formData.cgpa10 = parseFloat(formData.cgpa10) || 0;
//       formData.cgpa12 = parseFloat(formData.cgpa12) || 0;
//       formData.currentSemesterCgpa = parseFloat(formData.currentSemesterCgpa) || 0;

//       const sql = `INSERT INTO internship_applications (
//         name, email, phone, dateOfBirth, permanentAddress, state,
//         guardianName, relation, guardianPhone, institution, program, department, year,
//         instituteLocation, instituteState, currentSemesterCgpa, UG,
//         cgpa12, board12, cgpa10, board10, selectedDepartment,
//         faculty1, duration1, mode1, domain1, title1, remarks1,
//         faculty2, duration2, mode2, domain2, title2, remarks2,
//         faculty3, duration3, mode3, domain3, title3, remarks3,
//         docs, photo, transactionId, payment, agreeToTerms
//       ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

//       const values = [
//         formData.name, formData.email, formData.phone, formData.dateOfBirth, formData.permanentAddress,
//         formData.state, formData.guardianName, formData.relation, formData.guardianPhone, formData.institution,
//         formData.program, formData.department, formData.year, formData.instituteLocation, formData.instituteState,
//         formData.currentSemesterCgpa, formData.UG, formData.cgpa12, formData.board12, formData.cgpa10, formData.board10,
//         formData.selectedDepartment, formData.faculty1, formData.duration1, formData.mode1, formData.domain1, formData.title1,
//         formData.remarks1, formData.faculty2, formData.duration2, formData.mode2, formData.domain2, formData.title2, formData.remarks2,
//         formData.faculty3, formData.duration3, formData.mode3, formData.domain3, formData.title3, formData.remarks3,
//         formData.docs, formData.photo, formData.transactionId, formData.payment, formData.agreeToTerms
//       ];

//       pool.query(sql, values, (err, result) => {
//         if (err) {
//           console.error("Database Insertion Error:", err);
//           if (err.code === "ER_DUP_ENTRY") {
//             return res.status(400).json({ message: "An application with this transaction ID already exists!" });
//           }
//           return res.status(500).json({ message: "Error submitting application", error: err.message });
//         }
//         res.status(200).send("Application submitted successfully");
//       });

//     } catch (error) {
//       console.error("Server Error:", error);
//       if (error.code === "ER_DUP_ENTRY") {
//         return res.status(400).json({ message: "An application with this transaction ID already exists!" });
//       }
//       res.status(500).send("Internal server error");
//     }
//   }
// );

// // Serve uploaded files
// app.use("/uploads", express.static("uploads"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true,limit: '100mb' }));

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "placemetuser",
  password: "PwDmPlacemeter1234",
  database: "placemetdb",
});
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "peace",
//   database: "ccd_sip",
// });  

db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed:", err);
    return;
  }
  console.log("Connected to MySQL Database ✅");
});
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_MAIL; 
  const adminPassword = process.env.ADMIN_PASS; 

  if (email === adminEmail && password === adminPassword) {
    return res.status(200).json({ message: "Login successful!" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});
app.get("/api/internships", (req, res) => {
  const sql = "SELECT * FROM internship_applications ORDER BY createdAt";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching internship applications:", err);
      return res.status(500).json({ message: "Database query error" });
    }
    res.json(results);
  });
});

// Ensure the "uploads" directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  limits: { fileSize: 100 * 1024 * 1024 }, // Set max file size to 100MB
  storage,
});


// Fetch filtered mentors
app.post("/filter", (req, res) => {
  const { department, preferred_duration, internship_mode } = req.body;
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

// Handle Internship Application Submission
app.post(
  "/submit-application",
  upload.fields([
    { name: "docs", maxCount: 1 },
    { name: "photo", maxCount: 1 },
    { name: "payment", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const formData = req.body;
      const files = req.files;

      console.log("Received Form Data:", formData);
      console.log("Received Files:", files);

      formData.docs = files.docs ? files.docs[0].path : null;
      formData.photo = files.photo ? files.photo[0].path : null;
      formData.payment = files.payment ? files.payment[0].path : null;
      
      formData.agreeToTerms = formData.agreeToTerms === "true" ? 1 : 0;
      formData.cgpa10 = parseFloat(formData.cgpa10) || 0;
      formData.cgpa12 = parseFloat(formData.cgpa12) || 0;
      formData.currentSemesterCgpa = parseFloat(formData.currentSemesterCgpa) || 0;

      const sql = `INSERT INTO internship_applications (
        name, email, phone, dateOfBirth, permanentAddress, state,
        guardianName, relation, guardianPhone, institution, program, department, year,
        instituteLocation, instituteState, currentSemesterCgpa, UG,
        cgpa12, board12, cgpa10, board10, selectedDepartment,
        faculty1, duration1, mode1, domain1, title1, remarks1,
        faculty2, duration2, mode2, domain2, title2, remarks2,
        faculty3, duration3, mode3, domain3, title3, remarks3,
         docs, photo, transactionId, payment, agreeToTerms
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      const values = [
        formData.name, formData.email, formData.phone, formData.dateOfBirth, formData.permanentAddress,
        formData.state, formData.guardianName, formData.relation, formData.guardianPhone, formData.institution,
        formData.program, formData.department, formData.year, formData.instituteLocation, formData.instituteState,
        formData.currentSemesterCgpa, formData.UG, formData.cgpa12, formData.board12, formData.cgpa10, formData.board10,
        formData.selectedDepartment, formData.faculty1, formData.duration1, formData.mode1, formData.domain1, formData.title1,
        formData.remarks1, formData.faculty2, formData.duration2, formData.mode2, formData.domain2, formData.title2,
        formData.remarks2, formData.faculty3, formData.duration3, formData.mode3, formData.domain3, formData.title3,
        formData.remarks3, formData.docs, formData.photo, formData.transactionId,
        formData.payment, formData.agreeToTerms
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Database Insertion Error:", err);
          if (err.code === "ER_DUP_ENTRY") {
            console.log("Duplicate entry error");
            return res.status(400).json({ message: "An application with this transaction ID already exists!" });
          }

          return res.status(500).json({ message: "Error submitting application", error: err.message });
        }
        res.status(200).send("Application submitted successfully");
      });
    } catch (error) {
      console.error("Server Error:", error);
      if (error.code === "ER_DUP_ENTRY") {
        console.log("Duplicate entry error");
        return res.status(400).json({ message: "An application with this transaction ID already exists!" });
      }
      res.status(500).send("Internal server error ");
    }
  }
);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", () => console.log(`Server running on port ${PORT}`));
