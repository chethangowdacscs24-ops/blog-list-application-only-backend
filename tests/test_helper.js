const User = require("../models/user");

// sample blogs used in tests to populate the database
const initialBlogs = [
  {
    title: "First test blog",
    author: "Author One",
    url: "https://example.com/first",
    likes: 3,
  },
  {
    title: "Second test blog",
    author: "Author Two",
    url: "https://example.com/second",
    likes: 7,
  },
];

// helper to read users from the database and normalize them to plain JSON
const usersInDB = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  usersInDB,
};
