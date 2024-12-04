import express from "express"
import { bootstrap } from "./src/utils/bootstrap.js"

const app = express()
app.use(express.json())

bootstrap(app)
