import Mongoose, { Schema } from "mongoose";

export interface IAppraisal {
    userName: string;
    content: string;
}

const appraisalSchema = new Schema({
    userName: String,
    content: String,
}, {
    timestamps:true
})

const Appraisal = Mongoose.models.Appraisal || Mongoose.model("Appraisal", appraisalSchema)

export default Appraisal

