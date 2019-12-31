import axios from 'axios'
import Constants from '../constants';

const instance=axios.create({
    baseURL:Constants.SERVER_URL,
    
})

const loginGoogle=(token,source)=>{
    return instance.post('v1/auth/loginsocial',{token,source})
}

const fetchUsers=(JWT_TOKEN,tags,fromDate,toDate)=>{
    return instance.post('v1/fetch/getImages',{tags,fromDate,toDate},{headers:{"authorization":JWT_TOKEN}})
}
const fetchMessages=(JWT_TOKEN,roomId)=>{
    return instance.post('/v1/fetch/getMessages',{ JWT_TOKEN ,roomId });
}

export default {
    loginGoogle,fetchUsers,fetchMessages
}