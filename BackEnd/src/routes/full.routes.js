import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { FullService } from "../services/full.service.js";

dotenv.config();

const JWT_SECRET =
	process.env.TOKEN_SECRET || process.env.JWT_SECRET || "secret";

const router = express.Router();

const fullService = new FullService();

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
		const data = await fullService.getAll(req.query.maxResults);
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

router.post("/", authenticate, async (req, res, next) => {
	try {
		const data = await fullService.create(req.body);
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

router.patch("/", authenticate, async (req, res, next) => {
	try {
		const data = await fullService.edit(req.body);
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", authenticate, async (req, res, next) => {
	try {
		const data = await fullService.getByOwnerId(req.params.id);
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", authenticate, async (req, res, next) => {
	try {
		console.log("Deleting full with id:", req.params.id);
		res.status(201).json(await fullService.remove(req.params.id));
	} catch (err) {
		next(err);
	}
});

export default router;
