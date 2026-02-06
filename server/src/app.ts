import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import corsOptions from './config/cors.config.ts'

dotenv.config()


export class API {

    app
    port

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000;

        this.applyMiddlewares()
        this.useRootEndpoints()
        this.useAuthEndpoints()
        this.useClientEndpoints()
        this.useAdminEndpoints()
        this.useAgentEndpoints()

        this.app.listen(this.port, () => {
            console.log(`Server running on: http://localhost:${this.port}`)
        })

    }

    applyMiddlewares() {
        this.app.use(express.json())
        this.app.use(cors(corsOptions))
    }

    useRootEndpoints() {
        this.app.get('/', async (req, res) => {
            res.status(200).send("Server running well :3")
        });
    }
    useAuthEndpoints() { }
    useClientEndpoints() { }
    useAdminEndpoints() { }
    useAgentEndpoints() { }

}


