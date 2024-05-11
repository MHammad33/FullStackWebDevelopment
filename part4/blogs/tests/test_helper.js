const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5,
  },
  {
    title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12
  }
]

/**
 * @dev Function to get all the blogs in the database as JSON
 */
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/**
 * @dev Function to get the id of a blog that does not exist in the database
 */
const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon', author: 'willremovethissoon', url: 'willremovethissoon', likes: 0
  });

  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
}

module.exports = { initialBlogs, blogsInDb, nonExistingId }

