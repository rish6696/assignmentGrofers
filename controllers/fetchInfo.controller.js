import Models from '../models/index'
import { model } from 'mongoose'

async function fetchImages(req,res,next){
   const {tags,fromDate,toDate}=req.body;
  
   const imageModel=Models.imageModel();
   let query={};
   let dateQuery={};
   if(tags&&tags.length>0) query['tags']={$in:tags}
   
   if(fromDate){
       dateQuery['$gt']=fromDate
       query['date']=dateQuery;
   }
   if(toDate){
       let todate=new Date(toDate);
       todate.setDate(todate.getDate()-1);
       dateQuery['$lt']=toDate
       query['date']=dateQuery;
   }
   const images=await Models.imageModel().find(query);
   res.send(images);
  
}




export default {
    fetchImages
}