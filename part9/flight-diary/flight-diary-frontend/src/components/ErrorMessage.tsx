import { FC } from "react";

interface ErrorMessageProps {
	error: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
	return (
		<div
			style={{
				backgroundColor: "#ffe6e6",
				color: "#cc0000",
				border: "1px solid #cc0000",
				borderRadius: "5px",
				padding: "10px",
				marginBottom: "15px",
				display: "flex",
				alignItems: "center",
				margin: "10px 0 0 0",
			}}
		>
			<span style={{ fontWeight: "bold", marginRight: "10px" }}>Error:</span>
			{error}
		</div>
	);
};

export default ErrorMessage;
