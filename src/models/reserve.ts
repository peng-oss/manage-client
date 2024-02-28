import Mongoose, { Schema } from "mongoose";

export interface IReserve {
    userName: string;
    dateString: string;
}

const reserveSchema = new Schema({
    userName: String,
    dateString: String,
}, {
    timestamps:true
})

const Reserve = Mongoose.models.Reserve || Mongoose.model("Reserve", reserveSchema)

export default Reserve

