import React, { FC, useState } from "react";
import {
	Box,
	Button,
	Chip,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import patientService from "../services/patients";
import { EntryWithoutId, Patient } from "../types";
import { Cancel } from "@mui/icons-material";

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
		type: "HealthCheck",
		employerName: "",
		dischargeDate: "",
		dischargeCriteria: "",
		sickLeaveStartDate: "",
		sickLeaveEndDate: "",
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

			let newEntryData: EntryWithoutId;

			// Based on the type Entry
			if (formData.type === "Hospital") {
				newEntryData = {
					...formData,
					diagnosisCodes: diagnosisCodesArray,
					type: "Hospital",
					discharge: {
						date: formData.dischargeDate,
						criteria: formData.dischargeCriteria,
					},
				};
			} else if (formData.type === "OccupationalHealthcare") {
				newEntryData = {
					...formData,
					diagnosisCodes: diagnosisCodesArray,
					type: "OccupationalHealthcare",
					employerName: formData.employerName,
					sickLeave:
						formData.sickLeaveStartDate || formData.sickLeaveEndDate
							? {
									startDate: formData.sickLeaveStartDate || "",
									endDate: formData.sickLeaveEndDate || "",
							  }
							: undefined,
				};
			} else {
				newEntryData = {
					...formData,
					diagnosisCodes: diagnosisCodesArray,
					type: "HealthCheck",
					healthCheckRating: Number(formData.healthCheckRating),
				};
			}

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
				type: "HealthCheck",
				dischargeCriteria: "",
				dischargeDate: "",
				employerName: "",
				sickLeaveStartDate: "",
				sickLeaveEndDate: "",
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
				select
				fullWidth
				label="Entry Type"
				name="type"
				value={formData.type}
				onChange={handleInputChange}
				margin="normal"
				SelectProps={{ native: true }}
				required
			>
				<option value="HealthCheck">Health Check</option>
				<option value="Hospital">Hospital</option>
				<option value="OccupationalHealthcare">Occupational Healthcare</option>
			</TextField>

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
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const selectedDate = new Date(e.target.value);
					const today = new Date();
					if (selectedDate > today) {
						alert("Date cannot be in the future.");
						return;
					}
					handleInputChange(e);
				}}
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
			{formData.type === "HealthCheck" && (
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
			)}

			{formData.type === "Hospital" && (
				<>
					<TextField
						fullWidth
						label="Discharge Date (YYYY-MM-DD)"
						name="dischargeDate"
						type="date"
						InputLabelProps={{ shrink: true }}
						value={formData.dischargeDate}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const selectedDate = new Date(e.target.value);
							const today = new Date();
							if (selectedDate > today) {
								alert("Date cannot be in the future.");
								return;
							}
							handleInputChange(e);
						}}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Discharge Criteria"
						name="dischargeCriteria"
						value={formData.dischargeCriteria}
						onChange={handleInputChange}
						margin="normal"
						required
					/>
				</>
			)}

			{formData.type === "OccupationalHealthcare" && (
				<>
					<TextField
						fullWidth
						label="Employer Name"
						name="employerName"
						value={formData.employerName}
						onChange={handleInputChange}
						margin="normal"
						required
					/>
					<TextField
						fullWidth
						label="Sick Leave Start Date (YYYY-MM-DD)"
						name="sickLeaveStartDate"
						type="date"
						InputLabelProps={{ shrink: true }}
						value={formData.sickLeaveStartDate}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const selectedDate = new Date(e.target.value);
							const today = new Date();
							if (selectedDate > today) {
								alert("Date cannot be in the future.");
								return;
							}
							handleInputChange(e);
						}}
						margin="normal"
					/>
					<TextField
						fullWidth
						label="Sick Leave End Date (YYYY-MM-DD)"
						name="sickLeaveEndDate"
						type="date"
						InputLabelProps={{ shrink: true }}
						value={formData.sickLeaveEndDate}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const selectedDate = new Date(e.target.value);
							const today = new Date();
							if (selectedDate > today) {
								alert("Date cannot be in the future.");
								return;
							}
							handleInputChange(e);
						}}
						margin="normal"
					/>
				</>
			)}

			{/* <TextField
				fullWidth
				label="Diagnosis Codes (comma-separated)"
				name="diagnosisCodes"
				value={formData.diagnosisCodes}
				onChange={handleInputChange}
				margin="normal"
				placeholder="e.g., S03.5, M54.5"
			/> */}
			<FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
				<InputLabel id="diagnosis-codes-label" sx={{ marginTop: "-8px" }}>
					Diagnosis Codes
				</InputLabel>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Select
						labelId="diagnosis-codes-label"
						multiple
						value={formData.diagnosisCodes.split(",").filter((code) => code)}
						onChange={(e) => {
							const selectedCodes = e.target.value as string[];
							setFormData({
								...formData,
								diagnosisCodes: selectedCodes.join(","),
							});
						}}
						renderValue={(selected) => (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{(Array.isArray(selected) ? selected : []).map((code) => (
									<Chip
										key={code}
										label={code}
										sx={{
											marginRight: 1,
										}}
									/>
								))}
							</Box>
						)}
						MenuProps={{
							PaperProps: {
								sx: {
									maxHeight: 200,
								},
							},
						}}
						sx={{
							flexGrow: 1,
							paddingTop: "8px",
						}}
					>
						{["S03.5", "M54.5", "A12.1", "C14.8"].map((code) => (
							<MenuItem key={code} value={code}>
								{code}
							</MenuItem>
						))}
					</Select>

					{/* Cross button to clear filters inside the select */}
					{formData.diagnosisCodes && (
						<IconButton
							onClick={() => setFormData({ ...formData, diagnosisCodes: "" })}
							sx={{
								color: "gray",
								"&:hover": {
									color: "red", // Hover effect to indicate removal
								},
							}}
						>
							<Cancel sx={{ fontSize: "20px" }} />
						</IconButton>
					)}
				</Box>
			</FormControl>

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
