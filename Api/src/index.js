import express from "express";
import dotenv from 'dotenv'
import db from '../src/config/db.js'
dotenv.config()
import userController from '../src/controller/user.controller.js'
import adminController from '../src/controller/admin.controller.js'
import bodyParser from "body-parser";
import cors from 'cors'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/users', userController,)
app.use('/admins', adminController)

app.listen(port, async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully");
    console.log(`Listening port number ${port}`)
  } catch (error) {
    console.log('Error while connecting to db', error.message)
  }
})