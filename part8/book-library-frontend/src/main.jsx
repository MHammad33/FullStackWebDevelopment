import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	split,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("booksLibrary-user-token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		},
	};
});

const httpLink = createHttpLink({
	uri: "http://localhost:4000",
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
