import { Router } from "express";
import diagnosisService from "../services/diagnosisService";

const diagnosisRouter = Router();

diagnosisRouter.get("/", (_req, res) => {
	try {
		const diagnosis = diagnosisService.getAllDiagnosis();
		res.json(diagnosis);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while fetching diagnoses." });
	}
});

export default diagnosisRouter;
