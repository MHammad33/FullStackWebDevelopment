import { Router } from "express";

const diagnosisRouter = Router();

diagnosisRouter.get("/", (_req, res) => {
	res.send("Fetching all diagnosis");
});

export default diagnosisRouter;
