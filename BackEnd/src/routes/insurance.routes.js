import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { InsuranceService } from "../services/insurance.service.js";

dotenv.config();

const JWT_SECRET =
	process.env.TOKEN_SECRET || process.env.JWT_SECRET || "secret";

const router = express.Router();

const insuranceService = new InsuranceService();

export const authenticate = (req, res, next) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer "))
		return res.status(401).json({ message: "Missing token" });
	const token = header.split(" ")[1];
	try {
		const payload = jwt.verify(token, JWT_SECRET);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

router.get("/", authenticate, async (req, res, next) => {
	try {
		const insurances = await insuranceService.getInsurances(req.body);
		res.status(201).json(insurances);
	} catch (err) {
		next(err);
	}
});

router.post("/", authenticate, async (req, res, next) => {
	try {
		const insurance = await insuranceService.createInsurance(req.body);
		res.status(201).json(insurance);
	} catch (err) {
		next(err);
	}
});

router.patch("/", authenticate, async (req, res, next) => {
	try {
		const insurance = await insuranceService.editInsurance(req.body);
		res.status(201).json(insurance);
	} catch (err) {
		next(err);
	}
});

router.get(
	"/:id",
	authenticate,
	async (req, res, next) => {
		try {
			const insurance = await insuranceService.getInsuranceById(req.params.id);
			res.status(201).json(insurance);
		} catch (err) {
			next(err);
		}
	}
);

router.delete(
	"/:id",
	authenticate,
	async (req, res, next) => {
		try {
			await insuranceService.removeInsurance(req.params.id);
			res.status(201).json(true);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
