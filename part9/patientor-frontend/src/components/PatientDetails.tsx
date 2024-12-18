import {
	Box,
	Button,
	CardContent,
	CircularProgress,
	Typography,
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";
import Entries from "./Entries";
import AddEntryForm from "./AddEntryForm";

interface PatientDetailsProps {}

const PatientDetails: FC<PatientDetailsProps> = ({}) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [isFormOpen, setIsFormOpen] = useState(false);
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

	const handleCancelForm = () => {
		setIsFormOpen(false);
	};

	const onAddEntry = (updatedPatient: Patient) => {
		setPatient(updatedPatient);
	};

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

				{!isFormOpen && (
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mt={2}
					>
						<h2>Entries</h2>
						<Button
							variant="contained"
							color="primary"
							size="small"
							onClick={() => setIsFormOpen(true)}
						>
							Add Entry
						</Button>
					</Box>
				)}

				{isFormOpen && (
					<AddEntryForm
						patientId={id!}
						onCancel={handleCancelForm}
						onAddEntry={onAddEntry}
					/>
				)}

				{patient.entries && <Entries entries={patient.entries} />}
			</CardContent>
		</>
	);
};

export default PatientDetails;
