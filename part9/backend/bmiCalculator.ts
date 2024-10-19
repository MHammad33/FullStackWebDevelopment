import { isNotNumber } from "./utils";

type BMI = "Underweight" | "Normal Range" | "Overweight" | "Obese";

const calculateBmi = (heightInCM: number, bodyMassInKG: number): BMI => {
	const heightInMetres = heightInCM / 100;
	const bmi = bodyMassInKG / (heightInMetres * heightInMetres);

	if (bmi < 18.5) {
		return "Underweight";
	} else if (bmi >= 18.5 && bmi < 25) {
		return "Normal Range";
	} else if (bmi >= 25 && bmi < 30) {
		return "Overweight";
	} else {
		return "Obese";
	}
};

try {
	const args = process.argv.slice(2);

	if (args.length !== 2) {
		throw new Error(
			"Please provide exactly two arguments: height (cm) and weight (kg)."
		);
	}

	const heightInCM = Number(args[0]);
	const bodyMassInKG = Number(args[1]);

	if (isNotNumber(heightInCM) || isNotNumber(bodyMassInKG)) {
		throw new Error("Both height and weight should be valid numbers.");
	}

	console.log(calculateBmi(heightInCM, bodyMassInKG));
} catch (error) {
	console.log(`Error: ${error.message}`);
}
