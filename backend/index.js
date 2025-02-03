require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Basic route
app.get('/auth', (req, res) => {
  res.send('Hello World!');
});

// all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.route');
app.use('/api/auth/', authRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/reviews/', reviewRoutes);

// MongoDB connection and server start
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Successfully connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process if database connection fails
  }
}

main();
