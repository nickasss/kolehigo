//dependencies
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

//mysql

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "userdb",
});

app.get("/check-email", (req, res) => {
  const { email } = req.query;
  console.log('email ah', email)
  const SQL = "SELECT email FROM users WHERE email = ?";
  db.query(SQL, [email], (err, results) => {
    if (err) {
      console.log("error", err)
      return res.status(500).send({ error: err.message });
    } else {
      return res.send({ exists: results.length > 0 });
    }
  });
});

app.post("/register", (req, res) => {
  const sentEmail = req.body.Email;
  const sentPassword = req.body.Password;
  const sentBirthdate = req.body.Birthdate;
  const sentFirstName = req.body.FirstName;
  const sentMiddleName = req.body.MiddleName;
  const sentLastName = req.body.LastName;
  const sentMobileNumber = req.body.MobileNumber;

  const SQL =
    "INSERT INTO users (email, password, birthdate, firstname, middlename, lastname, mobilenumber) VALUES (?,?,?,?,?,?,?)";

  const Values = [
    sentEmail,
    sentPassword,
    sentBirthdate,
    sentFirstName,
    sentMiddleName,
    sentLastName,
    sentMobileNumber,
  ];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("User Inserted Succesfully!");
      res.send({ message: "User Added!" });
    }
  });
});

app.post("/login", (req, res) => {
  const sentLoginEmail = req.body.LoginEmail;
  const sentLoginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM users WHERE email = ? && password = ?";

  const Values = [sentLoginEmail, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.send({ message: "Credentials does not match!" });
    }
  });
});

app.get("/getUser/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const SQL = "SELECT * FROM users WHERE id = ?";
  const values = [userId];

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (results.length > 0) {
        res.json(results[0]); // Assuming there should be only one user with a given ID
      } else {
        res.status(404).json({ message: "No user found" });
      }
    }
  });
});

app.patch("/update/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { firstname, middlename, lastname, suffix, address } = req.body;
  const SQL =
    "UPDATE users SET firstname = ? , middlename = ?, lastname = ?, suffix = ?, address = ? WHERE id = ?";
  const values = [firstname, middlename, lastname, suffix, address, userId];

  db.query(SQL, values, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      db.query(`SELECT * FROM users WHERE id = ${userId}`, (err, results) => {
        res.status(200).json(results);
      });
    }
  });
});