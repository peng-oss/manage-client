import Mongoose, { Schema } from "mongoose";

export interface IReserve {
    _id:string
    username: string;
    dateString: string;
}

const reserveSchema = new Schema({
    username: String,
    dateString: String,
}, {
    timestamps:true
})

const Reserve = Mongoose.models.Reserve || Mongoose.model("Reserve", reserveSchema)

export default Reserve

