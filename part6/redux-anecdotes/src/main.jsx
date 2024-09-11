import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import anecdoteSlice from "./reducers/anecdoteSlice";
import filterSlice from "./reducers/filterSlice";

const store = configureStore({
	reducer: {
		anecdotes: anecdoteSlice,
		filter: filterSlice,
	},
});

store.subscribe(() => console.log(store.getState()));

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
