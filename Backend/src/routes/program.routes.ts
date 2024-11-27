import { Router,Request,Response } from "express";
import { createProgram, getAllPrograms } from "../Services/program.modal";


const programRouter = Router();

programRouter.post('/', async (req:Request,res:Response) => {
    try {
      const programData = req.body;
      const newProgram = await createProgram(programData);
      res.status(201).json(newProgram);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  });

  programRouter.get('/', async (req:Request,res:Response) => {
    try {
      const programs = await getAllPrograms();
      res.status(200).json(programs);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  });

  export default programRouter;