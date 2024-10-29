import { FC } from "react";

interface ContentProps {
	courseParts: {
		name: string;
		exerciseCount: number;
	}[];
}

const Content: FC<ContentProps> = ({ courseParts }) => {
	return (
		<div>
			{courseParts.map((coursePart) => (
				<p>
					{coursePart.name} {coursePart.exerciseCount}
				</p>
			))}
		</div>
	);
};

export default Content;
