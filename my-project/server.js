const express = require ('express');
const connectDB = require('./mongodb-mongoose/db');
const authRoutes = require('./routes/Auth');
const newsRoutes = require('./routes/news');


const app = express();

const PORT = process.env.PORT || 5570;

// Connect to the Database
connectDB();

// Middleware
app.use(express.json());

// Main route namespaces
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Global centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`CNN Backend API running on port ${PORT}`);
});
