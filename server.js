const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const { connectDB, findRestaurantById, getDb } = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.get("/api/restaurants", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    
    const db = getDb();
    const collection = db.collection("restaurants");
    
    const restaurants = await collection
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    const total = await collection.countDocuments();
    
    res.json({
      page,
      limit,
      total,
      restaurants,
    });
  } catch (err) {
    console.error("Error fetching restaurants:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await findRestaurantById(parseInt(restaurantId, 10));
    
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (err) {
    console.error("Error fetching restaurant details:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/api/restaurants/:id/reviews", async (req, res) => {
  const restaurantId = req.params.id;
  const { name, rating, review } = req.body;
  
  if (!name || !rating || !review) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  
  try {
    const db = getDb();
    const collection = db.collection("restaurants");
    
    const restaurant = await collection.findOne({
      "restaurant.R.res_id": parseInt(restaurantId, 10),
    });
    
    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    
    if (!restaurant.reviews) {
      restaurant.reviews = [];
    }
    
    restaurant.reviews.push({
      name,
      rating,
      review,
      date: new Date(),
    });
    
    await collection.updateOne(
      { "restaurant.R.res_id": parseInt(restaurantId, 10) },
      { $set: { reviews: restaurant.reviews } }
    );
    
    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Export the serverless function
exports.handler = serverless(app);