import express from 'express'
import authController from '../controllers/auth.controller'
import validator from 'express-validation'
import authValidator from '../validators/auth.validator'

const router=express.Router();



router.route('/loginsocial')
.post(validator(authValidator.loginSocial),authController.loginSocial)

export default router