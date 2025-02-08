
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cors = require("cors");
const bodyParser = require('body-parser');


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require("./routes/cart");


const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost: ${PORT}`));



