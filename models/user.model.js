import mongoose, { Mongoose } from 'mongoose'
import imageSchema from './image.schema'


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String,required:true },
    createdAt: { type: Date, default: new Date() },
    source:{type:String,required:true},
    lastLogin:{type:Date},
    socialToken:{type:String,required:true},
    imageUploads:[{ type: mongoose.Schema.Types.ObjectId, ref: 'image' }]
})





export default userSchema