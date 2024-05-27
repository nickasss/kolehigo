const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('client/public'));

// MySQL configuration
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'colleges',
});

// connect sa MySQL server
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID: ' + db.threadId);
});

//get the data based on the fitlered option
app.get('/colleges', (req, res) => {
    let sqlQuery = 'SELECT * FROM college WHERE 1=1';
    const params = [];

    // filter by name kung provided
    if (req.query.name) {
        sqlQuery += ' AND name LIKE ?';
        params.push(`%${req.query.name}%`);
    }

    // filter by location kung provided
    if (req.query.location) {
        sqlQuery += ' AND location LIKE ?';
        params.push(`%${req.query.location}%`);
    }

    // Filter by type (Public or Private) if provided
    if (req.query.type) {
        sqlQuery += ' AND type = ?';
        params.push(req.query.type);
    }

    //checks if what area ang school
    if (req.query.area) {
        sqlQuery += ' AND area = ?';
        params.push(req.query.area);
    }

    // execute the query with the filtered parameters
    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            console.error('Error fetching colleges:', err);
            return res.status(500).send({ error: 'Error fetching colleges' });
        }
        res.json(results);
    });
});

// server ga listening on port 3010
app.listen(3010, () => {
    console.log('Server is running on port 3010');
});

module.exports = app; // For testing or further modularization




