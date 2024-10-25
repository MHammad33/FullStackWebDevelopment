import { Router } from "express";
import patientService from "../services/patientService";

const patientRouter = Router();

patientRouter.get("/", (_req, res) => {
	try {
		const patients = patientService.getAllPatientDetails();
		res.json(patients);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while fetching diagnoses." });
	}
});

patientRouter.post("/", (req, res) => {
	const { name, dateOfBirth, ssn, gender, occupation } = req.body;

	const newPatient = patientService.createNewPatient({
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation,
	});
	res.json(newPatient);
});

export default patientRouter;
