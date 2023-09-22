import StatisticsLine from "./StatisticsLine";

const Statistics = (props) => {
	if (props.total === 0) {
		return (
			<>
				<h2>Statistics</h2>
				<div>No feedback given</div>
			</>
		);
	}
	return (
		<div>
			<h2>Statistics</h2>
			<table>
				<thead>
					<tr>
						<th>Quality</th>
						<th>No of Reviews</th>
					</tr>
				</thead>
				<tbody>
					<StatisticsLine text="good" value={props.good} />
					<StatisticsLine text="neutral" value={props.neutral} />
					<StatisticsLine text="bad" value={props.bad} />
					<StatisticsLine text="all" value={props.total} />
					<StatisticsLine text="average" value={(props.good + props.bad) / 2} />
					<StatisticsLine
						text="positives"
						value={((props.good / props.total) * 100).toFixed(2) + " %"}
					/>
				</tbody>
			</table>
		</div>
	);
};
export default Statistics;
