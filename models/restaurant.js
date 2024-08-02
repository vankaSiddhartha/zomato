const mongoose = require("mongoose");

// Define the review schema
const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
  date: { type: Date, default: Date.now }, // Ensure date field is defined and has a default value
});

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({
  has_online_delivery: Number,
  photos_url: String,
  url: String,
  price_range: Number,
  apikey: String,
  user_rating: {
    rating_text: String,
    rating_color: String,
    votes: String,
    aggregate_rating: String,
  },
  R: {
    res_id: Number,
  },
  name: String,
  cuisines: String,
  is_delivering_now: Number,
  deeplink: String,
  menu_url: String,
  average_cost_for_two: Number,
  book_url: String,
  switch_to_order_menu: Number,
  offers: [String], // Array of strings for offers
  has_table_booking: Number,
  location: {
    latitude: String,
    address: String,
    city: String,
    country_id: Number,
    locality_verbose: String,
    city_id: Number,
    zipcode: String,
    longitude: String,
    locality: String,
  },
  featured_image: String,
  currency: String,
  id: String,
  thumb: String,
  establishment_types: [String], // Array of strings for establishment types
  events_url: String,
  reviews: [reviewSchema], // Add reviews as an array of review documents
});

// Create the Restaurant model
const Restaurant = mongoose.model("R", restaurantSchema);

module.exports = Restaurant;
