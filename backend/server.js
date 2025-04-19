const express = require('express');
const cors = require('cors');
require('dotenv').config();
const protectedRoutes = require('./routes/protectedRoute'); // Ensure correct import path

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/protected', protectedRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));