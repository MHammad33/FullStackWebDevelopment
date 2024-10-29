import { FC } from "react";

interface TotalProps {
	totalExercises: number;
}

const Total: FC<TotalProps> = ({ totalExercises }) => {
	return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
