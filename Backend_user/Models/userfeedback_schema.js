import mongoose from 'mongoose';

const userFeedbackSchema = new mongoose.Schema({
name:
{
   type: String,
   required: true,
},
message:
{
    type: String,
},
createdAt: { 
    type: Date,
    default: Date.now },
});

const Feedback = mongoose.model("feedbacks", userFeedbackSchema);

export default Feedback;