import { Router } from "express"
import ExerciseRouter from "./Exercise.route"
import programRouter from "./program.routes"


const Routers = Router()


Routers.use('/Exercises',ExerciseRouter)

Routers.use('/programs',programRouter)



export default Routers