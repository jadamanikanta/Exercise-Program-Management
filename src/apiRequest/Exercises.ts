import axios from "axios";


export const createExercises = async (data:any) => {

    const reqData = JSON.stringify(data)

    try {

        const response = await axios({
            url:`http://localhost:3000/api/v1/Exercises/`,
            method:'post',
            headers:{ 
                'Content-Type':'application/json'
            },
            data:reqData
        })

        const responseData = await response?.data

        return responseData;
    }
    catch (err:any) {
        console.log(err?.message);
        
    }



}

// export const getAllExercises = async () => {

//     // const reqData = JSON.stringify(data)

//     try {

//         const response = await axios({
//             url:`http://localhost:3000/api/v1/Exercises/`,
//             method:'get',
//             headers:{ 
//                 'Content-Type':'application/json'
//             },
            
//         })

//         const responseData = await response?.data

//         return responseData;
//     }
//     catch (err:any) {
//         console.log(err?.message);
        
//     }



// }

export const deleteExercises = async (id:any) => {

    
    try {

        const response = await axios({
            url:`${origin}/api/v1/ivr-organization/${id}`,
            method:'patch',
            headers:{ 
                'Content-Type':'application/json'
            }
        })

        const responseData = await response?.data

        return responseData;
    }
    catch (err:any) {
        console.log(err?.message);
        
    }

}