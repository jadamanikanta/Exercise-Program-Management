import { Router,Request,Response } from "express";
import {
  createExercise,
  getAllExerciseDetails,
  softDeleteExerciseById
 
} from '../Services/Exercises.service'; 

const ExerciseRouter = Router();


ExerciseRouter.post('/', async (req:Request,res:Response) => {
  try  {
  
  const response = await createExercise(req?.body)
      res.send(response)
  }
  catch (err:any) {
      res.send(err?.message)
  }
})


ExerciseRouter.get('/', async (req:Request,res:Response) => {
  try  {
  
  const response = await getAllExerciseDetails()
      res.send(response)
  }
  catch (err:any) {
      res.send(err?.message)
  }
})

ExerciseRouter.patch('/:id', async (req:Request,res:Response) => {
  try {

    
      const response = await softDeleteExerciseById(req?.params?.id)

      res.send(response)
  }
  catch (err:any) {
      res.send({message:err?.message})
  }
})






export default ExerciseRouter;
