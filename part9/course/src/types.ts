interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
	description: string;
}

export interface CoursePartBasic extends CoursePartBaseWithDesc {
	kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: "group";
}

export interface CoursePartBackground extends CoursePartBaseWithDesc {
	backgroundMaterial: string;
	kind: "background";
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground;
