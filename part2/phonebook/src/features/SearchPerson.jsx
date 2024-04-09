import { useState } from "react";

const SearchPerson = ({ persons, handleSearch }) => {
	const [searchValue, setSearchValue] = useState("");

	return (
		<div>
			<h2>Search Contact</h2>
			<div className="search">
				<input
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
						setTimeout(() => {}, 2000);
						handleSearch(e.target.value);
					}}
				/>
				<button disabled>Search</button>
			</div>
		</div>
	);
};
export default SearchPerson;
