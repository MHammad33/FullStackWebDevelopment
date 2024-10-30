import { FC } from "react";
import { CoursePart } from "../types";

interface PartProps {
	part: CoursePart;
}

const Part: FC<PartProps> = ({ part }) => {
	switch (part.kind) {
		case "basic":
			return (
				<div>
					<p>
						<strong>{part.name}</strong> ({part.exerciseCount} exercises)
					</p>
					<p>{part.description}</p>
				</div>
			);
		case "group":
			return (
				<div>
					<p>
						<strong>{part.name}</strong> ({part.exerciseCount} exercises,{" "}
						{part.groupProjectCount} group projects)
					</p>
				</div>
			);
		case "background":
			return (
				<div>
					<p>
						<strong>{part.name}</strong> ({part.exerciseCount} exercises)
					</p>
					<p>{part.description}</p>
					<p>
						Background material:{" "}
						<a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
					</p>
				</div>
			);
		case "special":
			return (
				<div>
					<p>
						<strong>{part.name}</strong> ({part.exerciseCount} exercises)
					</p>
					<p>{part.description}</p>
					<p>Requirements: {part.requirements.join(", ")}</p>
				</div>
			);
		default:
			return null;
	}
};

export default Part;
