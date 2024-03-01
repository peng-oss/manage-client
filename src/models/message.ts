import Mongoose, { Schema } from "mongoose";

export interface IMessage {
    _id?:string
    username: string;
    content: string;
}

const messageSchema = new Schema({
    username: String,
    content: String,
}, {
    timestamps:true
})

const Message = Mongoose.models.Message || Mongoose.model("Message", messageSchema)

export default Message

