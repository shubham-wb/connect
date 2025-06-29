
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())


const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})