var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    email: String,
    password: String,

    Logos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Logo",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
