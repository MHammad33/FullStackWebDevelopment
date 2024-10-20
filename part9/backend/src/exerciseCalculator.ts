import { isNotNumber } from "./utils";

interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const calculateExercises = (
	dailyHours: number[],
	target: number
): ExerciseResult => {
	const periodLength = dailyHours.length;
	const trainingDays = dailyHours.filter((hours) => hours > 0).length;
	const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
	const average = totalHours / periodLength;
	const success = average >= target;

	let rating: number;
	let ratingDescription: string;

	if (average >= target) {
		rating = 3;
		ratingDescription = "Excellent, target achieved!";
	} else if (average >= target * 0.8) {
		rating = 2;
		ratingDescription = "Not too bad but could be better";
	} else {
		rating = 1;
		ratingDescription = "Needs improvement, below target";
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const args = process.argv.slice(2);

	if (args.length < 2) {
		throw new Error(
			"Please provide at least one target value and one day of exercise hours."
		);
	}

	const target = Number(args[0]);
	const dailyExerciseHours = args.slice(1).map((arg) => {
		if (isNotNumber(arg)) {
			throw new Error(`Invalid input: ${arg} is not a valid number`);
		}
		return Number(arg);
	});

	if (isNotNumber(target)) {
		throw new Error(`Invalid target value: ${target}`);
	}

	console.log(calculateExercises(dailyExerciseHours, target));
} catch (error) {
	console.log(`Error: ${error.message}`);
}
