import { FC } from "react";
import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
	courseParts: CoursePart[];
}

const Content: FC<ContentProps> = ({ courseParts }) => {
	return (
		<div>
			{courseParts.map((coursePart) => (
				<Part part={coursePart} />
			))}
		</div>
	);
};

export default Content;
