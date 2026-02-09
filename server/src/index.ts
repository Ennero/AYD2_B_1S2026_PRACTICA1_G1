import { DB_Connection } from './db/db.ts'
import express from 'express'
import cors from 'cors'
import corsOptions from './config/cors.config.ts'
import authRouter from './modules/auth/route.ts'
import adminRouter from './modules/admin/routes.ts'
import clientRouter from './modules/client/routes.ts'
import { agentRouter } from './modules/agent/routes.ts'
import { EnvVars } from './store/enviroment.ts'


const app = express()
const port = EnvVars.instance.PORT;

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
await DB_Connection.instance.connectDB()

app.get('/', async (req, res) => {
    res.status(200).send("Server running well :3")
});

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/client', clientRouter)
app.use('/api/agent', agentRouter)



app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
})


