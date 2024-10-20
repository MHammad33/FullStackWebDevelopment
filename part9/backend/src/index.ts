import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	try {
		if (!weight || !height || isNaN(height) || isNaN(weight)) {
			throw new Error("Malformatted Parameters");
		}

		const bmiResult = calculateBmi(height, weight);

		res.json({
			weight: weight,
			height: height,
			bmi: bmiResult,
		});
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

app.post("/exercises", (req, res) => {
	try {
		const { daily_exercises, target } = req.body;
		if (!daily_exercises || !target) {
			throw new Error("malformatted parameters");
		}

		res.status(200).json({ daily_exercises, target });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
