import { useEffect, useState } from "react";

const Search = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState("");

	return (
		<div className="search-container">
			<input
				type="text"
				placeholder="Search Countries..."
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
					onSearch(e.target.value);
				}}
			/>
			<button onClick={() => onSearch(searchValue)}>Search</button>
		</div>
	);
};
export default Search;
