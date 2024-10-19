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

console.log(calculateBmi(180, 74));
