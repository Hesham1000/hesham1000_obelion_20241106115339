const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
