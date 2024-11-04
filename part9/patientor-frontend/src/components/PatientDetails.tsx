import {
	Card,
	CardContent,
	CircularProgress,
	Container,
	Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";

interface PatientDetailsProps {}

const PatientDetails: FC<PatientDetailsProps> = ({}) => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPatient = async () => {
			try {
				const response = await fetch(`/api/patients/${id}`);
				const data: Patient = await response.json();
				setPatient(data);
			} catch (error) {
				console.error("Failed to fetch patient data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPatient();
	}, []);

	if (loading) {
		return <CircularProgress />;
	}

	if (!patient) {
		return <Typography variant="h6">Patient not found</Typography>;
	}

	return (
		<Container maxWidth="sm">
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h4" gutterBottom>
						{patient.name}
					</Typography>
					<Typography variant="body1">ID: {patient.id}</Typography>
					<Typography variant="body1">
						Date of Birth: {patient.dateOfBirth}
					</Typography>
					<Typography variant="body1">SSN: {patient.ssn}</Typography>
					<Typography variant="body1">Gender: {patient.gender}</Typography>
					<Typography variant="body1">
						Occupation: {patient.occupation}
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};

export default PatientDetails;
