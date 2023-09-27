import { useState } from "react";

const SearchPerson = ({ persons, handleSearch }) => {
	const [searchValue, setSearchValue] = useState("");

	return (
		<div>
			<h2>Search Contact</h2>
			<div>
				Search:{" "}
				<input
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
						setTimeout(() => {}, 2000);
						handleSearch(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};
export default SearchPerson;
