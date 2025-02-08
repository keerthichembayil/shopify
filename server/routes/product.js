const express = require("express");
const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");
const { protect, admin } = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadmiddleware");

const router = express.Router();

router.post("/", upload.single("image"),protect, admin, addProduct);
// here we are calling protect so jwttoken is needed mandatory evide login cheytht token kittiyal not enough user role admin
// avanam
router.get("/", getProducts);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;