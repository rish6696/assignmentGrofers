import mongoose from 'mongoose'
import userSchema from './user.model'
import imageSchema from './image.schema';


function userModel(){
    return mongoose.model('users',userSchema)
}

function imageModel(){
    return mongoose.model('image',imageSchema)
}



export default{
    userModel,imageModel
}