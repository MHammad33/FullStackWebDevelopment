const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  // ! Test list with no blogs
  const listWithNoBlogs = [];

  test("when list has no blogs, equals 0", () => {
    const result = listHelper.totalLikes(listWithNoBlogs);
    assert.strictEqual(result, 0);
  })

  // ! Test list with only one blog
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  // ! Test list with multiple blogs
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'First class tests',
      author: 'Edsger W. Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'TDD harms architecture',
      author: 'Edsger W. Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.htmll',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Type wars',
      author: 'Edsger W. Dijkstra',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.htmll',
      likes: 2,
      __v: 0
    }
  ]

  test("when list has multiple blogs, equals the likes of all", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 29);
  });
});