const express = require('express');
const connectDB = require('./src/config/DbConfig');
const userRoutes = require('./src/routes/userRoutes');
const authenticate = require('./src/middleware/auth');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/worko/user', authenticate, userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
