import { DataTypes } from "sequelize";
import db from "../config/db.js";

const SubCategory = db.define('sub_category', {
    sub_categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sub_categoryName: {
        type: DataTypes.STRING(255), allowNull: false, validate: {
            len: [1, 255]
        }
    },
    categoryId: {
        type: DataTypes.INTEGER, allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

export default SubCategory