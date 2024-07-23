const Notification = ({ message }) => {
	const notifcationStyles = {
		position: "fixed",
		top: "10px",
		left: "45%",
		backgroundColor: "red",
		color: "white",
		border: "1px solid green",
		borderRadius: "5px",
		padding: "10px",
		display: "block",
		width: "15%",
		textAlign: "center",
	};

	return (
		<>
			<div style={notifcationStyles}>{message}</div>
		</>
	);
};
export default Notification;
