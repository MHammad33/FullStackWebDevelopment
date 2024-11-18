import { FC, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import patientService from "../services/patients";
import { EntryWithoutId, Patient } from "../types";

interface AddEntryFormProps {
	patientId: string;
	onCancel: () => void;
	onAddEntry: (updatedPatient: Patient) => void;
}

const AddEntryForm: FC<AddEntryFormProps> = ({
	patientId,
	onCancel,
	onAddEntry,
}) => {
	const [formData, setFormData] = useState({
		description: "",
		date: "",
		specialist: "",
		healthCheckRating: 0,
		diagnosisCodes: "",
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const diagnosisCodesArray = formData.diagnosisCodes
				.split(",")
				.map((code) => code.trim());

			const newEntryData: EntryWithoutId = {
				...formData,
				diagnosisCodes: diagnosisCodesArray,
				healthCheckRating: Number(formData.healthCheckRating),
				type: "HealthCheck",
			};

			const updatedPatient = await patientService.addEntry(
				patientId,
				newEntryData
			);
			onAddEntry(updatedPatient);

			setFormData({
				description: "",
				date: "",
				specialist: "",
				healthCheckRating: 0,
				diagnosisCodes: "",
			});
			onCancel();
		} catch (error) {
			console.error("Error adding entry:", error);
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
			<Typography variant="h6">Add New Entry</Typography>
			<TextField
				fullWidth
				label="Description"
				name="description"
				value={formData.description}
				onChange={handleInputChange}
				margin="normal"
				required
			/>
			<TextField
				fullWidth
				label="Date (YYYY-MM-DD)"
				name="date"
				type="date"
				InputLabelProps={{ shrink: true }}
				value={formData.date}
				onChange={handleInputChange}
				margin="normal"
				required
			/>
			<TextField
				fullWidth
				label="Specialist"
				name="specialist"
				value={formData.specialist}
				onChange={handleInputChange}
				margin="normal"
				required
			/>
			<TextField
				fullWidth
				label="Health Check Rating"
				name="healthCheckRating"
				type="number"
				value={formData.healthCheckRating}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const value = Number(e.target.value);
					if (value > 3) {
						alert("Health Check Rating cannot be more than 3.");
						return;
					}
					handleInputChange(e);
				}}
				margin="normal"
				inputProps={{
					max: 3,
					min: 0,
				}}
				required
			/>
			<TextField
				fullWidth
				label="Diagnosis Codes (comma-separated)"
				name="diagnosisCodes"
				value={formData.diagnosisCodes}
				onChange={handleInputChange}
				margin="normal"
				placeholder="e.g., S03.5, M54.5"
			/>

			<Box display="flex" justifyContent="space-between" mt={2}>
				<Button variant="outlined" color="secondary" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit" variant="contained" color="primary">
					Add
				</Button>
			</Box>
		</Box>
	);
};

export default AddEntryForm;
