import express from 'express'
import authRoute from '../routes/auth.route'
import fetchRoute from '../routes/fetchInfo.route'
import imageUploadRoute from '../routes/ImageUpload.route';
const router=express.Router()

router.use('/auth',authRoute)
router.use('/fetch',fetchRoute)
router.use('/imageupload',imageUploadRoute)
export default router
