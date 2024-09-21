require("dotenv").config();

const mongoose = require("mongoose");
const Blog = require("./models/blog.model");
const User = require("./models/user.model");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

const populate = async () => {
  await connectDb();
  await Blog.deleteMany({});

  const blogObjects = [
    {
      title: "React patterns",
      author: "Fahad Afzal",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: "669f011261864d18aaa989cf"
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "M Hammad Afzal",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: "669f011e61864d18aaa989d1"
    },
    {
      title: "Canonical string reduction",
      author: "Fahad Afzal",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: "669f011261864d18aaa989cf"
    },
    {
      title: "First class tests",
      author: "Fahad Afzal",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: "669f011261864d18aaa989cf"
    },
    {
      title: "TDD harms architecture",
      author: "M Hammad Afzal",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: "669f011e61864d18aaa989d1"
    },
    {
      title: "Type wars",
      author: "M Hammad Afzal",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: "669f011e61864d18aaa989d1"
    }
  ];

  await Blog.insertMany(blogObjects);

  await mongoose.connection.close();
};

populate();
