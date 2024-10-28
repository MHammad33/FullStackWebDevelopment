import { NextFunction, Request, Response, Router } from "express";
import patientService from "../services/patientService";
import { z } from "zod";
import { NewPatientInfo } from "../types";
import { newPatientParser } from "../middlewares/validationMiddlewares";
import { errorMiddleware } from "../middlewares/errorMiddleware";

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

patientRouter.post(
	"/",
	newPatientParser,
	(req: Request<unknown, unknown, NewPatientInfo>, res) => {
		const newPatient = patientService.createNewPatient(req.body);
		res.json(newPatient);
	}
);

patientRouter.use(errorMiddleware);

export default patientRouter;
