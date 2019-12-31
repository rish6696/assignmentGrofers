import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import AuthHandler from './screens/AuthHandler'
import Home from './screens/Home'
import ChatSection from './screens/ProfileList'



const pp=createStackNavigator(
    { 
        chatSection: ChatSection,
    },
    { headerMode: 'none',
      navigationOptions:({ navigation }) => {
        let tabBarVisible = true;
        for (let i = 0; i < navigation.state.routes.length; i++) {
          if (navigation.state.routes[i].routeName == "messageSection") {
            tabBarVisible = false;
          }
        }
      
        return {
          tabBarVisible
        }
      }
     }
)




const MainNavigator = createSwitchNavigator(
    {
        auth: createStackNavigator({ AuthHandler: AuthHandler }, { headerMode: 'none' }),
        mainFlow: createBottomTabNavigator({
            Chat: pp
            ,Home: Home
        },
            {
                tabBarOptions: {
                    labelStyle: {
                        fontSize: 21,
                        color: '#3F51B5'
                    }
                }
            })
    })





const m = createAppContainer(MainNavigator)

export default m