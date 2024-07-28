import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test } from "vitest";

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

test("<Blog /> does renders title, author but does not render Url, likes", () => {
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

	const { container } = render(
		<Blog blog={testBlog} onUpdateBlog={() => {}} onDeleteBlog={() => {}} />
	);
	const blogHeader = container.querySelector(".blog-header");

	// Ensure Title and author are rendered
	expect(blogHeader).toHaveTextContent(testBlog.title);
	expect(blogHeader).toHaveTextContent(`by ${testBlog.author}`);

	// Ensure Url and Likes are not rendered by default
	expect(container.querySelector(".blog-full")).not.toBeInTheDocument();
	expect(screen.queryByText(`${testBlog.likes} likes`)).not.toBeInTheDocument();
	expect(
		screen.queryByText("Click here to see full blog")
	).not.toBeInTheDocument();
});
