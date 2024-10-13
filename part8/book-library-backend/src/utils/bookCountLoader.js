const DataLoader = require("dataloader");
const Book = require("../models/Book.model");

// Step 1: Fetch book counts for all authors in one query
// Step 2: Map authorIds to book count
// Step 3: Return Book counts for each author in the same order

const bookCountLoader = new DataLoader(
	async (authorIds) => {
		console.log(`Batch loading book counts for authors: ${authorIds}`);

		const books = await Book.aggregate([
			{ $match: { author: { $in: authorIds } } },
			{ $group: { _id: "$author", count: { $sum: 1 } } },
		]);

		const bookCountMap = books.reduce((acc, { _id, count }) => {
			acc[_id.toString()] = count;
			return acc;
		}, {});

		return authorIds.map((authorId) => bookCountMap[authorId.toString()] || 0);
	},
	{ cache: false }
);

module.exports = { bookCountLoader };
