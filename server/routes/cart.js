const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:id", protect, removeFromCart);

module.exports = router;