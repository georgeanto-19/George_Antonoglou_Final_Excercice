import express from "express";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserService } from "./../services/user.service.js";

dotenv.config();

const JWT_SECRET =
	process.env.TOKEN_SECRET || process.env.JWT_SECRET || "secret";
const JWT_EXPIRES = process.env.TOKEN_EXPIRES || "1h";

const router = express.Router();

const userService = new UserService();

router.post("/", async (req, res, next) => {
	try {
		const user = await userService.getUser(req.body.username);
		if (!user) return res.status(401).json({ message: "Invalid credentials" });
		//TODO: FIX PASSWORD CHECKING
		// const match = await bcrypt.compare(req.body.password, user.password);
		// if (!match) return res.status(401).json({ message: "Invalid credentials" });
		const payload = {
			id: user._id,
			username: user.username,
			roles: user.roles,
		};
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
		return res.json({ user, token });
	} catch (err) {
		next(err);
	}
});

export default router;
