import { Request, Router } from "express";
import patientService from "../services/patientService";
import { Entry, NewPatient } from "../types";
import {
	newEntryParser,
	newPatientParser,
} from "../middlewares/validationMiddlewares";
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
			.json({ message: "An error occurred while fetching patients." });
	}
});

patientRouter.post(
	"/",
	newPatientParser,
	(req: Request<unknown, unknown, NewPatient>, res) => {
		const newPatient = patientService.createNewPatient(req.body);
		res.json(newPatient);
	}
);

patientRouter.get("/:id", (req, res) => {
	try {
		const patientId = req.params.id;
		const patient = patientService.getPatientById(patientId);
		res.json(patient);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred while fetching patient." });
	}
});

patientRouter.post(
	"/:id/entries",
	newEntryParser,
	(req: Request<{ id: string }, unknown, Entry>, res) => {
		try {
			const patientId = req.params.id;
			const updatedPatient = patientService.addEntry(req.body, patientId);
			res.json(updatedPatient);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ message: "An error occurred while fetching patient." });
		}
	}
);

patientRouter.use(errorMiddleware);

export default patientRouter;
