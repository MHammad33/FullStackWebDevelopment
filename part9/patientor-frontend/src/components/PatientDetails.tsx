import {
	Card,
	CardContent,
	CircularProgress,
	Container,
	Typography,
} from "@mui/material";
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
