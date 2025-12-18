import { connection } from "../db.js";

export const addNameController = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const q = "insert into meniem (name) values(?)";
  await connection.promise().execute(q, [name]);

  const query = "select * from meniem ";
  const [rows] = await connection.promise().execute(query);
  res.json(rows);
};
