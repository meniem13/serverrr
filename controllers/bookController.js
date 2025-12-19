import { connection } from "../db.js";

export const createBookController = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,  OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ PRE-FLIGHT HANDLER
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = "SELECT * FROM meniem";
  const [rows] = await connection.promise().execute(query);

  res.status(200).json(rows);
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
