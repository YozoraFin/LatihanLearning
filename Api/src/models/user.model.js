import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const User = db.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(50), allowNull: false, validate: {
            len: [1, 50], // Minimal 1 karakter, maksimal 50 karakter
        },
    },
    lastName: {
        type: DataTypes.STRING(50), allowNull: false, validate: {
            len: [1, 50],
        },
    },
    email: {
        type: DataTypes.STRING(100), allowNull: false, unique: true, validate: {
            isEmail: true, // Validasi format email
            len: [5, 100],
        },
    },
    password: {
        type: DataTypes.STRING(255), allowNull: false, validate: {
            len: [8, 255],
        },
    },
    gender: {
        type: DataTypes.STRING(10), allowNull: false, validate: {
            isIn: [['Male', 'Female', 'Other']], // Validasi nilai gender
        },
    },
    profile_pic: { type: DataTypes.STRING(255), allowNull: true },
    resetPasswordToken: { type: DataTypes.STRING(512), allowNull: true, defaultValue: '' }
}, {
    freezeTableName: true,
    timestamps: false
})

export const Admin = db.define('admin', {
    adminId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(50), allowNull: false, validate: {
            len: [1, 50], // Minimal 1 karakter, maksimal 50 karakter
        },
    },
    lastName: {
        type: DataTypes.STRING(50), allowNull: false, validate: {
            len: [1, 50],
        },
    },
    email: {
        type: DataTypes.STRING(100), allowNull: false, unique: true, validate: {
            isEmail: true, // Validasi format email
            len: [5, 100],
        },
    },
    password: {
        type: DataTypes.STRING(255), allowNull: false, validate: {
            len: [8, 255],
        },
    },
    gender: {
        type: DataTypes.STRING(10), allowNull: false, validate: {
            isIn: [['Male', 'Female']], // Validasi nilai gender
        },
    },
    profile_pic: { type: DataTypes.STRING(255), allowNull: true },
    resetPasswordToken: { type: DataTypes.STRING(512), allowNull: true, defaultValue: '' }
}, {
    freezeTableName: true,
    timestamps: false
})