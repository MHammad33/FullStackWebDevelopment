const initialBlogs = [
  {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 100,
    "id": "663f337312a14cbf0a40c95d"
  },
  {
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12,
    "id": "663f337312a14cbf0a40c95e"
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
}

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}