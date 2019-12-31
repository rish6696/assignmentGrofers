import Joi from 'joi'
import { join } from 'path';

const signUp={
    body:{
        name:Joi.string().required(),
        email:Joi.string().email(),
        phoneNumber:Joi.string().required()
    }
}

const loginSocial={
    body:{ 
        token:Joi.string().required(),
        source:Joi.string().required()
    }
}

export default {
    signUp,loginSocial
}