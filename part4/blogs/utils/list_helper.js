const dummy = (blogs) => {
  // ...
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  }

  console.log(blogs);

  return blogs.reduce(reducer, 0);
}

module.exports = { dummy, totalLikes };