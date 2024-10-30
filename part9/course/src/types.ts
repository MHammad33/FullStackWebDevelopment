interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
	description: string;
}

interface CoursePartSpecial extends CoursePartBaseWithDesc {
	requirements: string[];
	kind: "special";
}

interface CoursePartBasic extends CoursePartBaseWithDesc {
	kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: "group";
}

interface CoursePartBackground extends CoursePartBaseWithDesc {
	backgroundMaterial: string;
	kind: "background";
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;
