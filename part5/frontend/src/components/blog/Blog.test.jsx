import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";

test("renders content", () => {
	const testBlog = {
		title: "Test Title",
		author: "Test Author",
		url: "Test Url",
		likes: 124,
		user: {
			id: "669f011261864d18aaa989cf",
			username: "Test Username",
			name: "Test Name",
		},
		id: "669f017ecd19dfe4f9d816c0",
	};

	render(<Blog blog={testBlog} />);

	const element = screen.getByText("Test Title");
	expect(element).toBeDefined();
});
