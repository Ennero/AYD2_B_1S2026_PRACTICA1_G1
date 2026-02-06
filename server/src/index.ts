import express from 'express'
import dotenv from 'dotenv'

dotenv.config()



const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.status(200).send("Server running well :3")
});

// TODO add the cors
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})