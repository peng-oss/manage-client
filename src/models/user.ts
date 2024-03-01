
 import mongoose from "mongoose";


export enum RoleCode{
    // 管理员
    Admin = "1",
    //讲解员
    Guid = "2",
    //用户
    normal="3"
}

export interface IUserInfo {
    _id?: string
    username?: string
    phone?: string
    sex?: string,
    receiveStatus?: boolean
    role: {
        code: RoleCode,
        value:String
    }
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    },
    phone: {
        type: String,
        required: false,
    },
    sex: {
        type: String,
        required: false,
    },
    receiveStatus: {
        type: Boolean,
        required: false,
    },
    role: {
        type: {
            code: String,
            value:String
        },
        default: {
            code: 3,
            value:"用户"
        },
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;