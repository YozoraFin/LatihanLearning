import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Category = db.define('category', {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: DataTypes.STRING(255), allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

export default Category