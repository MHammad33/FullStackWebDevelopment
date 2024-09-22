import BlogList from "../components/BlogList";
import Login from "../components/login/Login";

const RenderContent = ({
  isPending,
  isError,
  error,
  fetchedBlogs,
  user,
  update,
  remove,
  noteFormRef,
  login
}) => {
  const errorMessage = error?.response?.data?.error;

  if (isPending) return <h3>Loading...</h3>;

  if (isError) {
    if (errorMessage === "Jwt Token Expired" || error.message === "User is not logged in.") {
      return <Login onLogin={login} />;
    }
    return <div>Error: {error.message}</div>;
  }

  return user ? (
    <BlogList
      blogs={fetchedBlogs}
      update={update}
      remove={remove}
      currentUser={user}
      noteFormRef={noteFormRef}
    />
  ) : (
    <Login onLogin={login} />
  );
};

export default RenderContent;
