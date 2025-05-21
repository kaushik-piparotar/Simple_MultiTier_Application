const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve static files if needed
app.use(express.static(__dirname));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY, text TEXT)");
    db.run("INSERT INTO messages (text) VALUES ('Hello from the database by Kaushik Piparotar!')");
});

// Store public IP in an environment variable
const publicIp = process.env.PUBLIC_IP || '0.0.0.0';

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
    db.get("SELECT text FROM messages WHERE id = 1", (err, row) => {
        if (err || !row) {
            res.json({ message: 'Error fetching data.' });
        } else {
            res.json({ message: row.text });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Backend server is running at http://${publicIp}:${PORT}`);
});
