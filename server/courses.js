const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// create an express app
const app = express();
app.use(express.json());
app.use(cors());

// iconfigure MySQL connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'courses',
});

// connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
        return;
    }
    console.log('Successfully connected to the database with ID:', db.threadId);
});

// endpoint para kwaon ang list of courses for a specific college
app.get('/courses/:school', (req, res) => {
    console.log(`Requested school: ${req.params.school}`);
    const school = req.params.school.toLowerCase();

    // Define a map for school to table mapping to prevent SQL injection
    const schoolTableMap = {
        "central philippine university": "cpu",
        "university of san agustin": "san_ag"
    };

    const tableName = schoolTableMap[school];
    if (!tableName) {
        console.error(`Invalid school name provided: ${school}`);
        res.status(404).send({ error: 'College not found. Please provide a valid college name.' });
        return;
    }

    const sqlQuery = `SELECT * FROM ${tableName}`;
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(`Error fetching courses from ${tableName}:`, err.message);
            res.status(500).send({ error: 'Database error occurred while fetching courses.' });
            return;
        }
        if (results.length === 0) {
            res.status(404).send({ error: 'No courses found for the specified college.' });
            return;
        }
        res.json(results);
    });
});

// Start the server
const PORT = 3011;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

