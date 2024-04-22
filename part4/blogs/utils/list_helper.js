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

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes);
  return blogs.find(blog => blog.likes === Math.max(...likes));
}

const mostBlogs = (blogs) => {
  // Author with number of blogs
  const authorCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  let maxAuthor = "";
  let maxCount = 0;

  // Find author with most blogs
  for (const author in authorCount) {
    if (authorCount[author] > maxCount) {
      maxCount = authorCount[author];
      maxAuthor = author;
    }
  }

  // Return author with most blogs
  return {
    author: maxAuthor,
    blogs: maxCount
  }
}

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7", title: "React patterns", "author": "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0
  }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

mostBlogs(blogs);

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };