import {combineReducers} from 'redux'
import Types from '../actions/types';



const currentUser=(currentUser=null,action)=>{
   
        switch (action.type) {
            case Types.CURRENT_USER:
                return {
                    ... action.payload
                }
        
            default:
           return  currentUser
        }
}



const GoogleSignAuth=(state=null,action)=>{
    switch (action.type) {
        case Types.GOOGLE_SIGNIN_COMPLETE:
            return {
                GoogleResponse:action.payload
            }
        case Types.GOOGLE_SIGNOUT:
            return {
                ...state
            }
    
        default:
            return state
    }

}

const fetchUsers=(state=null,action)=>{
  switch (action.type) {
      case Types.FETCH_USERS:
          return action.payload;

        case Types.ERROR_WHILE_FETCH:
            return {
               status:false
            }
  
      default:
          return state
  }
}




export default combineReducers({
    GoogleSignAuth,fetchUsers,currentUser,
})