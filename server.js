import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

// ✅ Allow frontend localhost to access
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// MySQL connection
const connection = await mysql.createConnection({
  host: "localhost", // replace with your MySQL host
  user: "root", // your DB user
  password: "password", // your DB password
  database: "railway", // your DB name
});

// Test route to fetch books
app.get("/api/create_book", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM meniem");
    console.log("Query result:", rows); // log on server
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
