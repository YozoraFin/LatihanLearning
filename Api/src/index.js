import express from "express";
import dotenv from 'dotenv'
import db from '../src/config/db.js'
dotenv.config()
import userController from '../src/controller/user.controller.js'
import adminController from '../src/controller/admin.controller.js'
import categoryController from '../src/controller/category.controller.js'
import subCategoryController from '../src/controller/sub_category.controller.js'
import productController from '../src/controller/product.controller.js'
import bodyParser from "body-parser";
import cors from 'cors'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/users', userController,)
app.use('/admins', adminController)
app.use('/category', categoryController)
app.use('/subcategory', subCategoryController)
app.use('/product', productController)

app.listen(port, async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully");
    console.log(`Listening port number ${port}`)
  } catch (error) {
    console.log('Error while connecting to db', error.message)
  }
})