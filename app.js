const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const taskRoutes = require('./routes/taskRoutes');  
const userRoutes = require('./routes/userRoutes');

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


