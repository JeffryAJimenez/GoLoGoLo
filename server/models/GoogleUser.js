var mongoose = require("mongoose");

var GoogleUserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
});

module.exports = mongoose.model("GoogleUser", GoogleUserSchema);
