import express from "express";
import { Admin } from "../models/user.model.js";
import bcryptUtils from "../utils/password.utils.js";
import { validateRegister } from "../middleware/validateRegister.js";
import { validateLogin } from "../middleware/validateLogin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await Admin.findAll();
    return res.status(200).json({ data: admins });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/admin/:id", async (req, res) => {
  try {
    const {id} = req.params
    const admin = await Admin.findByPk(id);
    return res.status(200).json({ data: admin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/register", validateRegister, async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body;
    const hashPassword = bcryptUtils.hashPassword(password);

    const existingAdmin = await Admin.findOne({ where: { email: email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const createAdmin = await Admin.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      gender: gender,
    });

    return res.status(201).json({
      message: "Admin Created Succesfully",
      data: {
        adminId: createAdmin.adminId,
        firstName: createAdmin.firstName,
        lastName: createAdmin.lastName,
        email: createAdmin.email,
        gender: createAdmin.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email: email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    const isPasswordValid = bcryptUtils.comparePassword(
      password,
      admin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    return res.status(200).json({
      message: "Login Success",
      data: {
        adminId: admin.adminId,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        gender: admin.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
