import { Router } from "express";

const patientRouter = Router();

patientRouter.get("/", (_req, res) => {
	res.send("Fetching all patients");
});

export default patientRouter;
