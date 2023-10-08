import dotenv from 'dotenv'
import express from 'express';
import router from './routes'
import errorHandler from './middleware/errorHandler'
dotenv.config()

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json()) // knp kalo dimatiin TypeError: Cannot destructure property 'first_name' of 'req.body' as it is undefined.

app.use(router)
app.use(errorHandler)

export default app

