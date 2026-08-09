const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ensures each username is unique in the database
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // stores references to Blog documents by id
    },
  ],
});

// format the MongoDB document before sending JSON to the client
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // never expose password hashes in API responses
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
