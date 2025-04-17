const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "node_mysql",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});
const port = 3000;

const app = express();

app.use(express.json());

app.post("/create", (req, res) => {
  const { id, name, address, salary } = req.body;
  db.query(
    "INSERT INTO customer (id, name, address , salary) VALUES (?, ?, ?, ?)",
    [id, name, address, salary],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting data");
      } else {
        res.status(201).send({ message: "created", result: result });
      }
    }
  );
});

app.get("/find-all", (req, res) => {
  db.query("SELECT * FROM customer", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data");
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
