import { Request, Response, NextFunction } from "express";
import { NewEntrySchema, NewPatientSchema } from "../utils";

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

export const newEntryParser = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		NewEntrySchema.parse(req.body);
		next();
	} catch (error) {
		next(error);
	}
};
