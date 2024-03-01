import Mongoose, { Schema } from "mongoose";

export interface IAppraisal {
    _id:string
    username: string;
    content: string;
}

const appraisalSchema = new Schema({
    username: String,
    content: String,
}, {
    timestamps:true
})

const Appraisal = Mongoose.models.Appraisal || Mongoose.model("Appraisal", appraisalSchema)

export default Appraisal

