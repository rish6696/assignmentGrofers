import express from 'express'
import fetchInfoController from '../controllers/fetchInfo.controller'
import JwtMiddleWare from '../middlewares/authentication';
import validator from 'express-validation'


const router=express.Router();

router.route('/getImages')
.post(JwtMiddleWare,fetchInfoController.fetchImages)

export default router