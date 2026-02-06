import { connectDB } from './db/db.ts'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import corsOptions from './config/cors.config.ts'
import authRouter from './modules/auth/route.ts'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors(corsOptions))
void connectDB()

app.get('/', async (req, res) => {
    res.status(200).send("Server running well :3")
});

app.use("/auth", authRouter)



app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
})


