import express from "express";
const app = express();

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
	const { weight, height } = req.query;

	try {
		if (!weight || !height) {
			throw new Error("Weight or height cannot be empty");
		}

		res.json({ weight, height });
	} catch (error) {
		res.status(401).json({ msg: error.message });
	}
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
