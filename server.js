import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

let connection;

async function init() {
  connection = await mysql.createConnection({
    host: "centerbeam.proxy.rlwy.net",
    port: 17952,
    user: "root",
    password: "RlOTjXcZeQbQfzDQImqIcvTJUgxxjljQ",
    database: "railway",
  });

  console.log("MySQL connected!");

  app.get("/apias", async (req, res) => {
    try {
      const [rows] = await connection.execute("SELECT * FROM meniem");

      return new Response(JSON.stringify(rows), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // allow all for testing
        },
      });
    } catch (err) {
      console.error("DB error:", err);
      res.status(500).json({ error: "Database error" });
    }
  });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
  });
}

init();
