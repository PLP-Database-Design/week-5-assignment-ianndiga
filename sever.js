const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

const app = express();

// MySQL connection setup
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve patients' });
      return;
    }
    res.json(results);
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve providers' });
      return;
    }
    res.json(results);
  });
});

// Question 3: Filter patients by First Name
app.get('/patients/filter', (req, res) => {
  const firstName = req.query.first_name;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  connection.query(query, [firstName], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve patients by first name' });
      return;
    }
    res.json(results);
  });
});

// Question 4: Retrieve all providers by their specialty
app.get('/providers/filter', (req, res) => {
  const specialty = req.query.provider_specialty;
  const query = 'SELECT first_name, last_name FROM providers WHERE provider_specialty = ?';
  connection.query(query, [specialty], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
      return;
    }
    res.json(results);
  });
});

// Listen to the server
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
