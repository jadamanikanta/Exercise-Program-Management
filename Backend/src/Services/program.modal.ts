import ProgramModal from "../models/program.modal";


export const createProgram = async (programData: any) => {
    try {
      const newProgram = new ProgramModal(programData);
      await newProgram.save();
      return newProgram;
    } catch (error:any) {
      throw new Error('Error creating program: ' + error.message);
    }
  };

  export const getAllPrograms = async () => {
    try {
      const programs = await ProgramModal.find({ is_deleted: false });
      return programs;
    } catch (error:any) {
      throw new Error('Error fetching programs: ' + error.message);
    }
  };