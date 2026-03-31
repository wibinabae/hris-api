const express = require("express");
const pool = require("./src/config/db.js");
const authRoutes = require('./src/routes/authRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes.js')
const divisionRoutes = require('./src/routes/divisionRoutes.js')

require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("HRIS API is running");
});

app.use('/employee', employeeRoutes)
app.use('/auth', authRoutes);

app.use('/organization', divisionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
