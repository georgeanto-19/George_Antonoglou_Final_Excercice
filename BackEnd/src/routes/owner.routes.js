import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OwnerService } from "./../services/owner.service.js";

dotenv.config();

const JWT_SECRET =
	process.env.TOKEN_SECRET || process.env.JWT_SECRET || "secret";

const router = express.Router();

const ownerService = new OwnerService();

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
		const owners = await ownerService.getOwners(req.body);
		res.status(201).json(owners);
	} catch (err) {
		next(err);
	}
});

router.post("/", authenticate, async (req, res, next) => {
	try {
		const owner = await ownerService.createOwner(req.body);
		res.status(201).json(owner);
	} catch (err) {
		next(err);
	}
});

router.patch("/", authenticate, async (req, res, next) => {
	try {
		const owner = await ownerService.editOwner(req.body);
		res.status(201).json(owner);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", authenticate, async (req, res, next) => {
	try {
		const owner = await ownerService.getOwnerById(req.params.id);
		res.status(201).json(owner);
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", authenticate, async (req, res, next) => {
	try {
		console.log("Deleting owner with id:", req.params.id);
		res.status(201).json(await ownerService.removeOwner(req.params.id));
	} catch (err) {
		next(err);
	}
});

export default router;
