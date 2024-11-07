import { FC } from "react";
import { Diagnosis, Entry } from "../types";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealingIcon from "@mui/icons-material/Healing";

interface EntryDetailsProps {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const EntryDetails: FC<EntryDetailsProps> = ({ entry, diagnoses }) => {
	switch (entry.type) {
		case "Hospital":
			return (
				<Box>
					<Typography variant="h6">
						<LocalHospitalIcon color="error" /> Hospital Entry
					</Typography>
					<Typography variant="body2">Date: {entry.date}</Typography>
					<Typography variant="body2">
						Description: {entry.description}
					</Typography>
					<h3>Diagnosis Codes</h3>
					{entry.diagnosisCodes && (
						<ul>
							{entry.diagnosisCodes.map((code) => {
								const diagnosis = diagnoses.find((d) => d.code === code);
								return (
									<li key={code}>
										{code} {diagnosis ? `- ${diagnosis.name}` : ""}
									</li>
								);
							})}
						</ul>
					)}
					<Typography variant="body2">
						Discharge: {entry.discharge.date} - {entry.discharge.criteria}
					</Typography>

					<Typography variant="body2">
						Diagnosis by {entry.specialist}
					</Typography>
				</Box>
			);
		case "HealthCheck":
			return (
				<Box>
					<Typography variant="h6">
						<MedicalServicesIcon color="primary" /> Health Check Entry
					</Typography>
					<Typography variant="body2">Date: {entry.date}</Typography>
					<Typography variant="body2">
						Description: {entry.description}
					</Typography>
					<Typography variant="body2">
						Health Rating: {entry.healthCheckRating}
					</Typography>
					<h3>Diagnosis Codes</h3>
					{entry.diagnosisCodes && (
						<ul>
							{entry.diagnosisCodes.map((code) => {
								const diagnosis = diagnoses.find((d) => d.code === code);
								return (
									<li key={code}>
										{code} {diagnosis ? `- ${diagnosis.name}` : ""}
									</li>
								);
							})}
						</ul>
					)}
					<Typography variant="body2">
						Diagnosis by {entry.specialist}
					</Typography>
				</Box>
			);
		case "OccupationalHealthcare":
			return (
				<Box>
					<Typography variant="h6">
						<HealingIcon color="success" /> Occupational Healthcare Entry
					</Typography>
					<Typography variant="body2">Date: {entry.date}</Typography>
					<Typography variant="body2">
						Employer: {entry.employerName}
					</Typography>
					<Typography variant="body2">
						Description: {entry.description}
					</Typography>
					{entry.sickLeave && (
						<Typography variant="body2">
							Sick Leave: {entry.sickLeave.startDate} to{" "}
							{entry.sickLeave.endDate}
						</Typography>
					)}
					<h3>Diagnosis Codes</h3>
					{entry.diagnosisCodes && (
						<ul>
							{entry.diagnosisCodes.map((code) => {
								const diagnosis = diagnoses.find((d) => d.code === code);
								return (
									<li key={code}>
										{code} {diagnosis ? `- ${diagnosis.name}` : ""}
									</li>
								);
							})}
						</ul>
					)}
					<Typography variant="body2">
						Diagnosis by {entry.specialist}
					</Typography>
				</Box>
			);
		default:
			// Ensure exhaustive type checking
			const _exhaustiveCheck: never = entry;
			return _exhaustiveCheck;
	}
};

export default EntryDetails;
