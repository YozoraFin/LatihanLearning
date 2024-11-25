import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req?.params?.id);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
