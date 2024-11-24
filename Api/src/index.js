import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hallo Dunia!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})