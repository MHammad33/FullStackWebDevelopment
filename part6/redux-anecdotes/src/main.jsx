import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import anecdoteSlice from "./slices/anecdoteSlice";
import filterSlice from "./slices/filterSlice";
import notificationSlice from "./slices/notificationSlice";

const store = configureStore({
	reducer: {
		anecdotes: anecdoteSlice,
		filter: filterSlice,
		notification: notificationSlice,
	},
});

store.subscribe(() => console.log(store.getState()));

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
