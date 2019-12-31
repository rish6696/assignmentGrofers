import dotenv from 'dotenv'
dotenv.config()
const DB_URL=process.env.DB_URL
const JWT_SECRET=process.env.JWT_SECRET
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const s3AcessKey=process.env.s3_ACCESS_KEY
const s3SecretKey=process.env.SECRET_ACCESS_KEY
const bucketName=process.env.BUCKET_NAME;
const BUCKET_URL=process.env.BUCKET_URL
const PORT=process.env.PORT;

export default {
    DB_URL,JWT_SECRET,GOOGLE_CLIENT_ID,s3SecretKey,s3AcessKey,bucketName,BUCKET_URL,
    PORT
}