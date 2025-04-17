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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
