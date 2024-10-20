import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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
		res.status(401).json({ msg: error.message });
	}
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
