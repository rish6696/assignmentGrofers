import mongoose from 'mongoose';

const imageSchema=new mongoose.Schema({
    name:{type:String,required:true},
    type:{type:String,required:true},
    size:{type:Number,required:true},
    tags:[],
    key:{type:String,required:true},
    uri:{type:String,required:true},
    date:{type:Date,required:true}
})

//tag aur key fronted daalkr dega
export default imageSchema
