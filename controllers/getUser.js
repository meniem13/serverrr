// const getUserController = (req, res) => {
//   const { email, password } = req.body;
//   const q = "select * from users where email=?";
//   connection.query(q, [email], (err, result) => {
//     if (err) return res.status(500).json("could not find user");
//     try {
//       if (result[0].password === password) {
//         res.status(200).json("success");
//       } else res.status(500).json("wrong password");
//     } catch (error) {
//       res.status(500).json("error creating user");
//     }
//   });
// };

import { userModel } from "../models/userModel.js";

export const getUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const nameFromModel = await userModel(email);
  res.json(nameFromModel);
};
