import Feedback from "../Models/userfeedback_schema.js";

export const add_feedback= async(req,res)=>{
    try{
        const {name,message}=req.body;
        const feedback = new Feedback({ name, message });
        await feedback.save();
        return res.status(201).json({
            message:"User Feedback has added Successfully"
        })
        
    }
    catch(error){

        return res.status(500).json({
            status:false,
            message:error
        })
        
    }
}

export const get_feedback=async(req,res)=>{
    try{
         const feedbacks = await Feedback.find().sort({ createdAt: -1 });
         return res.status(200).json({
            status:true,
            feedbacks:feedbacks
        })
    }
    catch(error){

        return res.status(500).json({
            status:false,
            message:error
        })
        
    }
}