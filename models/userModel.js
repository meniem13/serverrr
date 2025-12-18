import { connection } from "../db.js";

export async function userModel(email) {
  const q = "SELECT * FROM users WHERE email = ?";
  const [rows] = await connection.promise().execute(q, [email]);
  return rows;
}
