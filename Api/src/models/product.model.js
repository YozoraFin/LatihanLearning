import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Product = db.define('product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: DataTypes.STRING(255), allowNull: false, validate: {
            len: [1, 255]
        }
    },
    productBrand: {
        type: DataTypes.STRING(255), allowNull: false, validate: {
            len: [1, 255]
        }
    },
    productColor: {
        type: DataTypes.STRING(255), allowNull: false, validate: {
            len: [1, 255]
        }
    },
    productDescription: {
        type: DataTypes.TEXT, allowNull: false  //karena longtext gausah validasi
    },
    productPrice: {
        type: DataTypes.FLOAT, allowNull: false, validate: {
            isFloat: true
        }
    },
    productQty: {
        type: DataTypes.INTEGER, allowNull: false, validate: {
            isInt: true
        }
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