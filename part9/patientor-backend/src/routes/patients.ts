import { NextFunction, Request, Response, Router } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";
import { z } from "zod";
import { NewPatientInfo } from "../types";

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

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body);
		next();
	} catch (error) {
		next(error);
	}
};

const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

patientRouter.post(
	"/",
	newDiaryParser,
	(req: Request<unknown, unknown, NewPatientInfo>, res) => {
		const newPatient = patientService.createNewPatient(req.body);
		res.json(newPatient);
	}
);

patientRouter.use(errorMiddleware);

export default patientRouter;
