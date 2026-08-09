// returns a fixed value so tests can verify helper setup
const dummy = (blog) => {
  return 1;
};

// calculate the total number of likes across all blog posts
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

module.exports = { dummy, totalLikes };
