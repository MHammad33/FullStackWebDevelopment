import {
	Box,
	CardContent,
	CircularProgress,
	ListItem,
	Typography,
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";

interface PatientDetailsProps {}

const PatientDetails: FC<PatientDetailsProps> = ({}) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) {
			navigate("/");
			return;
		}

		const fetchPatient = async () => {
			try {
				const patientData = await patientService.getById(id);
				setPatient(patientData);
			} catch (error) {
				console.error("Failed to fetch patient data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPatient();
	}, [id, navigate]);

	if (loading) {
		return <CircularProgress />;
	}

	if (!patient) {
		return <Typography variant="h6">Patient not found</Typography>;
	}

	return (
		<>
			<CardContent>
				<Typography variant="h4" gutterBottom>
					{patient.name}{" "}
					{patient.gender === "male" ? (
						<MaleIcon color="primary" />
					) : (
						<FemaleIcon color="secondary" />
					)}
				</Typography>
				<Typography variant="body1">SSN: {patient.ssn}</Typography>
				<Typography variant="body1">
					Occupation: {patient.occupation}
				</Typography>

				<h2>Entries</h2>

				{patient.entries.map((entry) => (
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
										{entry.diagnosisCodes.map((code) => (
											<ListItem
												key={code}
												sx={{
													display: "list-item",
													padding: 0,
													fontSize: "0.875rem",
													color: "text.primary",
												}}
											>
												{code}
											</ListItem>
										))}
									</ul>
								</Box>
							</>
						)}
					</div>
				))}
			</CardContent>
		</>
	);
};

export default PatientDetails;
