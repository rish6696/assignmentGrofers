import Joi from 'joi'


const requestUpload={
    body:{
        fileName:Joi.string().required()
    }
}


export default {
    requestUpload
}