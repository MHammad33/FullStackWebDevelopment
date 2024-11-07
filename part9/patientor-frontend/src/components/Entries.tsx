import { Box, ListItem, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Diagnosis, Entry } from "../types";
import diagnosisService from "../services/diagnosis";

interface EntryDetailsProps {
	entries: Entry[];
}

const Entries: FC<EntryDetailsProps> = ({ entries }) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

	useEffect(() => {
		const fetchDiagnosis = async () => {
			try {
				const diagnosesData = await diagnosisService.getAll();
				setDiagnoses(diagnosesData);
			} catch (error) {
				console.error("Failed to fetch diagnoses data:", error);
			}
		};

		fetchDiagnosis();
	}, []);

	return (
		<>
			{entries.map((entry) => (
				<div key={entry.id} style={{ marginBottom: "1em" }}>
					<Typography variant="body2">
						<strong>Date:</strong> {entry.date}
					</Typography>
					<Typography variant="body2">
						<strong>Description:</strong> {entry.description}
					</Typography>
					{entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
						<>
							<Typography variant="body2">
								<strong>Diagnose Codes:</strong>{" "}
							</Typography>
							<Box component="ul" sx={{ paddingLeft: 2, margin: 0 }}>
								<ul>
									{entry.diagnosisCodes.map((code) => {
										const diagnosis = diagnoses?.find((d) => d.code === code);
										return (
											<ListItem
												key={code}
												sx={{
													display: "list-item",
													padding: 0,
													fontSize: "0.875rem",
													color: "text.primary",
												}}
											>
												{code} {diagnosis ? `- ${diagnosis.name}` : ""}
											</ListItem>
										);
									})}
								</ul>
							</Box>
						</>
					)}
				</div>
			))}
		</>
	);
};

export default Entries;
