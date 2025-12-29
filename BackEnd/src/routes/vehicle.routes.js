import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { VehicleService } from "../services/vehicle.service.js";

dotenv.config();

const JWT_SECRET =
	process.env.TOKEN_SECRET || process.env.JWT_SECRET || "secret";

const router = express.Router();

const vehicleService = new VehicleService();

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
		const vehicles = await vehicleService.getVehicles(req.body);
		res.status(201).json(vehicles);
	} catch (err) {
		next(err);
	}
});

router.post("/", authenticate, async (req, res, next) => {
	try {
		const vehicle = await vehicleService.createVehicle(req.body);
		res.status(201).json(vehicle);
	} catch (err) {
		next(err);
	}
});

router.patch("/", authenticate, async (req, res, next) => {
	try {
		const vehicle = await vehicleService.editVehicle(req.body);
		res.status(201).json(vehicle);
	} catch (err) {
		next(err);
	}
});

router.get(
	"/:id",
	authenticate,
	async (req, res, next) => {
		try {
			const vehicle = await vehicleService.getVehicleById(req.params.id);
			res.status(201).json(vehicle);
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
			await vehicleService.removeVehicle(req.params.id);
			res.status(201).json(true);
		} catch (err) {
			next(err);
		}
	}
);

export default router;
