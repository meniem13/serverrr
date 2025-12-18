import { connection } from "../db.js";

export const createBookController = (req, res) => {
  const user_id = req.cookies.user_mbookstore;
  const q = "insert into books (user_id) values(?)";

  connection.query(q, [user_id], (err, result) => {
    try {
      res.status(200).json("book created");
    } catch (error) {
      res.status(500).json("error creating user");
    }
  });
};

export const createBookDetailsController = (req, res) => {
  const { book_id, title, description, price, photo_url } = req.body;

  const q =
    "insert into book_details (book_id, title, description, price, photo_url) values (?, ?, ?, ?, ?)";

  connection.query(
    q,
    [book_id, title, description, price, photo_url],
    (err, result) => {
      if (err) {
        return res.status(500).json("error inserting book");
      }
      res.status(200).json(result.insertId);
    }
  );
};

export const deleteBookController = (req, res) => {
  const id = req.params.book_id;

  const q = "delete from books where book_id=? ";
  connection.query(q, [id], (err, result) => {
    if (err) {
      return res.status(500).json("error deleting book");
    }

    res.status(200).json("deleted");
  });
};
