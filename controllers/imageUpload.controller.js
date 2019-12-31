import Models from '../models/index'
import { model, mongo } from 'mongoose'
import Aws from 'aws-sdk';
import config from '../config';
import mongoose from 'mongoose';



const s3=new Aws.S3({
    accessKeyId:config.s3AcessKey,
    secretAccessKey:config.s3SecretKey,
    signatureVersion:'v4',
    params:{
        Bucket:config.bucketName,   
    },
    region:'ap-south-1',
    
    
})

function requestupload(req,res,next){

   s3.getSignedUrl('putObject',{
       ContentType:'image/jpeg',
       Key:`${req.user}/${req.body.fileName}`

   },(err,url)=>{
       res.send({url,key:`${req.user}/${req.body.fileName}`});
   })
    

}

async function imageUploadComplete(req,res,next){
    let imageObject =req.body;
    const key=`${req.user}/${imageObject.name}`;
    imageObject={...imageObject,date:Date.now(),key:key}
    const ImageModel =Models.imageModel();
    const image=new ImageModel({...imageObject});
    const result=await image.save();
    const userModel=Models.userModel();
    const objectId=mongoose.Types.ObjectId(req.user);
    const response=await userModel.findByIdAndUpdate({_id:objectId},{$push:{imageUploads:result._id}},{new:true})
    
    res.send({status:true});
    
}


function imageDelete(req,res,next){
    //

}





export default {
    requestupload,imageUploadComplete,imageDelete
}