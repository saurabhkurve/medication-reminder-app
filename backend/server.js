const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import the path module
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const adminRoutes = require('./routes/adminRoutes');
const verifyTokenAndRole = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from this origin
  })
);

// Serve Postman collection
app.get('/postman-collection', (req, res) => {
  res.sendFile(path.join(__dirname, 'postman-collection.json'));
});

app.use('/api/auth', authRoutes);
app.use('/api', medicineRoutes);
app.use('/api/admin', verifyTokenAndRole("admin"), adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});