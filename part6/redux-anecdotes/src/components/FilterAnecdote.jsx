import { useDispatch } from "react-redux";
import { changeFilter } from "../slices/filterSlice";

const FilterAnecdote = () => {
	const dispatch = useDispatch();

	const handleChange = (event) => {
		const filter = event.target.value;
		dispatch(changeFilter(filter));
	};
	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
};
export default FilterAnecdote;
