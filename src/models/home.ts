import Mongoose, { Schema } from "mongoose";

export interface IHome {
    introduction: string
    notice: string
    timeDetail: string
    phone:string
}

const homeSchema = new Schema({
    introduction: String,
    notice: String,
    timeDetail: String,
    phone: String  
}, {
    timestamps:true
})

const Home = Mongoose.models.Home || Mongoose.model("Home", homeSchema)

export default Home

