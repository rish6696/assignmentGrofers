import React from 'react'
import { Provider } from 'react-redux'
import store from './store';



import Container from './container'





export default class AppComponent extends React.Component {
   
    render(){
        return(
            <Provider store={store}>
                <Container   
                 /> 
            </Provider>
        )
    }
}




