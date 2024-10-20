type BMI = "Underweight" | "Normal Range" | "Overweight" | "Obese";

export const calculateBmi = (heightInCM: number, bodyMassInKG: number): BMI => {
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

if (require.main === module) {
	try {
		const height = Number(process.argv[2]);
		const weight = Number(process.argv[3]);

		if (isNaN(height) || isNaN(weight)) {
			throw new Error("malformatted parameters");
		}

		console.log(calculateBmi(height, weight));
	} catch (error) {
		console.error((error as Error).message);
	}
}
