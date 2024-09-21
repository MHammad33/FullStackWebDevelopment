const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((acc, blog) => (acc.likes > blog.likes ? acc : blog), blogs[0]);
};

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const authorWithMostBlogs = Object.keys(authors).reduce((acc, author) => {
    return authors[author] > authors[acc] ? author : acc;
  }, Object.keys(authors)[0]);

  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs]
  };
};

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const authorWithMostLikes = Object.keys(authors).reduce((acc, author) => {
    return authors[author] > authors[acc] ? author : acc;
  }, Object.keys(authors)[0]);

  return {
    author: authorWithMostLikes,
    likes: authors[authorWithMostLikes]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
