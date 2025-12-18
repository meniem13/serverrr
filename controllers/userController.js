import { connection } from "../db.js";

export const createUserController = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  const q = "insert into users (name, email, password) values(?, ?, ?)";

  connection.query(q, [name, email, password], (err, result) => {
    if (err) return res.status(500).json("error creating user");
    const user_id = result.insertId;
    const query = "select * from users where user_id = ?";

    connection.query(query, [user_id], (err, result) => {
      if (err) return res.status(500).json("Error retrieving user data");

      console.log(result);
      res
        .cookie("user_mbookstore", `${result[0].user_id}`, { httpOnly: true })
        .status(200)
        .json("user created");
    });
  });
};
