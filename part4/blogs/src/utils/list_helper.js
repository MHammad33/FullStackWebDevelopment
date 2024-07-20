const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((acc, blog) => acc.likes > blog.likes ? acc : blog, blogs[0]);
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}