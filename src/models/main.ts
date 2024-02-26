import Mongoose, { Schema } from "mongoose";

export interface IMain {
    introduction: string
    notice: string
    timeDetail: string
}

const mainSchema = new Schema({
    introduction: String,
    notice: String,
    timeDetail: String
}, {
    timestamps:true
})

const Main = Mongoose.models.Main || Mongoose.model("Main", mainSchema)

export default Main

