import ExerciseModal from '../models/Exercises.model';



export const createExercise = async (data: any) => {
  try {
    const { name, sets, reps, holdTime, weight, turnsPerMinute} = data;

    
    const existingExercise = await ExerciseModal.findOne({
      name,
      is_deleted:false 
    });

    if (!existingExercise) {
      
      const exerciseData = {
        name,
        sets,
        reps,
        holdTime,
        weight,
        turnsPerMinute,
      };

      
      const response = await ExerciseModal.create(exerciseData);

      return { message: 'success', exercise: response };
    } else {
      return { message: 'Exercise with this name already exists and is active' };
    }
  } catch (err: any) {
    return { message: err?.message };
  }
};


export const getAllExerciseDetails = async () => {
  try {
  
    const exercises = await ExerciseModal.find({ is_deleted: false }); 

    if (exercises.length > 0) {
      return { message: "success", exercises };
    } else {
      return { message: "No exercises found" };
    }
  } catch (err: any) {
    return { message: err?.message };
  }
};

export const softDeleteExerciseById = async (id:any) => {

  try {

    const response = await ExerciseModal?.updateOne({_id:id},{is_deleted:true},{new:true})

    return { message:"success",response}
  }
  catch (err:any) {
    return ({message:err?.message})
  }
}  



