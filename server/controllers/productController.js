const Product = require("../models/Product");
exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // const imageUrl = `/uploads/${req.file.filename}`; // Store file path
    const imageUrl = `${req.file.filename}`

    const newProduct = new Product({
      name,
      price,
      image: imageUrl, // Save image path in DB
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};