import { createConnection } from "mysql2";

export const connection = createConnection({
  host: "centerbeam.proxy.rlwy.net",
  port: 17952,
  user: "root",
  password: "RlOTjXcZeQbQfzDQImqIcvTJUgxxjljQ",
  database: "railway",
});

connection.connect((err, conn) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
});
connection.query("SELECT * FROM meniem", (err, result) => {
  console.log(result);
});
