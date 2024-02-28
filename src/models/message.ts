import Mongoose, { Schema } from "mongoose";

export interface IMessage {
    userName: string;
    content: string;
}

const messageSchema = new Schema({
    userName: String,
    content: String,
}, {
    timestamps:true
})

const Message = Mongoose.models.Message || Mongoose.model("Message", messageSchema)

export default Message

