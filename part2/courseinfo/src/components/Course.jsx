import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const Course = ({ course }) => {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total sum={course.parts.reduce((s, p) => s + p.exercises, 0)} />
		</>
	);
};
export default Course;
