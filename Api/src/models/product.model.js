import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Product = db.define('product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: DataTypes.STRING(255), allowNull: false
    },
    productBrand: {
        type: DataTypes.STRING(255), allowNull: false
    },
    productColor: {
        type: DataTypes.STRING(255), allowNull: false
    },
    productDescription: {
        type: DataTypes.TEXT, allowNull: false
    },
    productPrice: {
        type: DataTypes.FLOAT, allowNull: false
    },
    productQty: {
        type: DataTypes.INTEGER, allowNull: false
    },
    productImages: {
        type: DataTypes.JSON, allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER, allowNull: false 
    }
}, {
    freezeTableName: true,
    timestamps: false
})

export default Product