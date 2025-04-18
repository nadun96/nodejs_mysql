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

app.get("/find/:id", (req, res) => {
  const { id } = req.params.id;
  const query = "SELECT * FROM customer WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data");
    } else {
      res.status(200).send({ message: "found", result: result });
    }
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params.id;
  const { name, address, salary } = req.body;
  const query =
    "UPDATE customer SET name = ?, address = ?, salary = ? WHERE id = ?";
  db.query(query, [name, address, salary, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating data");
    }
    if (result.affectedRows === 0) {
      res.status(404).send("No record found with this ID");
    }
    res.status(200).send({ message: "updated", result: result });
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params.id;
  const query =
    "DELETE FROM customer WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating data");
    }
    if (result.affectedRows === 0) {
      res.status(404).send("No record found with this ID");
    }
    res.status(204).send({ message: "deleted", result: result });
  });
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
