import { connection } from "../db.js";

export const addNameController = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  console.log(email);
  const q = "insert into meniem (name) values(?)";
  await connection.promise().execute(q, [email]);

  const query = "select * from meniem ";

  const [rows] = await connection.promise().execute(query);
  console.log(rows);
  res.json(rows);
};
