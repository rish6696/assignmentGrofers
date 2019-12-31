import jwt from 'jsonwebtoken';
import config from '../config';

function jwtMiddleWare(req,res,next){
    

    
    const  JWT_TOKEN  =req.headers.authorization;
    if(!JWT_TOKEN){
        return res.send({
            status:false,
            Error:'No_Auth_Token'
        })
    }
    try {
        const result=jwt.verify(JWT_TOKEN,config.JWT_SECRET);
        req.user=result.userID;
        next();
    } catch (error) {
        return res.send({status:false,error:'Token_Expired'});
    }



}
export default jwtMiddleWare;