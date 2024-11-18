import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Diagnosis, Entry } from "../types";
import diagnosisService from "../services/diagnosis";
import EntryDetails from "./EntryDetails";

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
			{entries.map((entry) => {
				console.log("entry", entry);
				return (
					<Box
						key={entry.id}
						sx={{
							marginBottom: "1em",
							padding: 2,
							border: "1px solid #ddd",
							borderRadius: "8px",
						}}
					>
						<EntryDetails entry={entry} diagnoses={diagnoses || []} />
					</Box>
				);
			})}
		</>
	);
};

export default Entries;
