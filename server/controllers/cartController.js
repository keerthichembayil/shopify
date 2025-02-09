const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });//this is extracted from jwttoken
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }
    // here it mention the item so the item in the model that is given in the body so productid and quantity
    //do not forget console will block server exectuion so avoid console before ruunig whole project
    let existingItem = cart.items.find(item => item.productId.toString() === req.body.productId);
   
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId: req.body.productId, quantity: 1 });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// perticular user inte full cart details

//note that there is an id inside items array as _id this id is used to delete

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    // evide populate.items that line is important ennal mathrame aa items array with fulldtails attach avu

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIdToRemove = req.params.id; // The ID of the item to remove
    console.log("itemidtoremove",itemIdToRemove);

    // Method 1: Using filter (more concise)
    cart.items = cart.items.filter(item => String(item._id)!== String(itemIdToRemove)); // Important: Convert IDs to strings for comparison
    await cart.save(); // Important: Save the changes to the database

    res.json(cart); 

  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Server error" });
  }
};