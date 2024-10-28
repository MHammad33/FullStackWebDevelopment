import { Request, Response, NextFunction } from "express";
import { NewPatientSchema } from "../utils";

export const newPatientParser = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		NewPatientSchema.parse(req.body);
		next();
	} catch (error) {
		next(error);
	}
};
