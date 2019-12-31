import express from 'express'
import validator from 'express-validation'
import imageValidator from '../validators/imageUpload.validator'
import authMiddleWare from '../middlewares/authentication'
import imageController from '../controllers/imageUpload.controller'

const router=express.Router();



router.route('/imageDelete')
.post(authMiddleWare,imageController.imageDelete)

router.route('/imageUploadComplete')
.post(authMiddleWare,imageController.imageUploadComplete)


router.route('/imageUploadRequest')
.post(authMiddleWare,validator(imageValidator.requestUpload),imageController.requestupload)

export default router