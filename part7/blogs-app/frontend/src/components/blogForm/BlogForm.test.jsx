import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogFrom />", () => {
  test("calls onAddBlog function with right details", async () => {
    // Add Blog Mock function
    const addBlog = vi.fn();

    render(<BlogForm onAddBlog={addBlog} />);

    const user = userEvent.setup();

    const titleInput = screen.queryByPlaceholderText("Title");
    const authorInput = screen.queryByPlaceholderText("Author");
    const urlInput = screen.queryByPlaceholderText("URL");

    await user.type(titleInput, "Test Title");
    await user.type(authorInput, "Test Author");
    await user.type(urlInput, "Test URL");

    const addBlogButton = screen.getByRole("button", /Add Blog/i);
    await user.click(addBlogButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog).toHaveBeenCalledWith({
      title: "Test Title",
      author: "Test Author",
      url: "Test URL"
    });
  });
});
