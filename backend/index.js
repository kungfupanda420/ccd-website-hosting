require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

// Fetch filtered mentors
app.post("/filter", (req, res) => {
  const { department, preferred_duration, internship_mode } = req.body;

  let query = "SELECT * FROM Mentors WHERE 1=1";
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
