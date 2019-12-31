import jwt from 'jsonwebtoken'
import models from '../models'
import config from '../config';
import axios from 'axios'
import logger from '../helpers/logger'
const { OAuth2Client } = require('google-auth-library');



async function verifyGoogleToken(token) {
    return new Promise(async (resolve, reject) => {
        const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend 
            });
            const payload = ticket.getPayload();
            resolve({ name: payload.name, email: payload.email, socialToken: token, source: 'google' })

        } catch (error) {
            logger.authLogger.error(error);
            reject(error)
        }
    })
}




async function loginSocial(req, res, next) {
    const { token, source } = req.body
    const validationPromise = source === 'google' ? verifyGoogleToken(token) : verifyFacebookToken(token)
    try { req.body = await validationPromise } catch (error) {
        return res.status(400).send({ status: false, message: 'Invalid token' })
    }
    const UserModel = models.userModel()
    const user = await UserModel.findOne({ email: req.body.email })
    let userID = null
    let newUser = false;
    if (!user) {
        const userInstance = new UserModel({ ...req.body, lastLogin: new Date() })
        const result = await userInstance.save()
        userID = result.id
        newUser = true
    }
    if (!newUser) {       //checks if newuser is not created then get id from fetched user
        userID = user.id
    }

    const jwtToken = jwt.sign({ userID }, config.JWT_SECRET)
    newUser ? res.send({ status: true, jwtToken,userID }) :
        UserModel.updateOne({ _id: userID }, { $set: { lastLogin: new Date() } }).
            then(x => res.send({ status: true, jwtToken, userID })).
            catch(e => res.send({ status: false, error: e }))
}

export default {
    loginSocial
}