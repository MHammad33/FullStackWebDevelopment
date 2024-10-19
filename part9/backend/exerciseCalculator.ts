interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (
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

const target = Number(process.argv[2]);
const dailyExerciseHours = process.argv.slice(3).map(Number);

console.log(calculateExercises(dailyExerciseHours, target));
