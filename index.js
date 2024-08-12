const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "banner_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Get banner details
app.get("/api/banner", (req, res) => {
  db.query("SELECT * FROM banner WHERE id = 1", (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Update banner details
app.post("/api/banner", (req, res) => {
  const { description, timer, link, visible } = req.body;
  db.query(
    "UPDATE banner SET description = ?, timer = ?, link = ?, visible = ? WHERE id = 1",
    [description, timer, link, visible],
    (err) => {
      if (err) throw err;
      res.send("Banner updated successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
