import 'react-native-gesture-handler';
import React, { useEffect, useReducer, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import ChatSettingScreen from './screens/ChatSettingScreen';
import { useAuthUser } from './auth/auth-hook';
import AddUserToChat from './screens/AddUserToChat';
import { auth } from './firebase';

const ACTIONS = {
  SIGN_IN: 'signin',
  SIGN_OUT: 'signout',
  CURRENT_USER_EXITS: 'currentUser'
}

export const AuthContext = React.createContext({})

const reducer = (prevState: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      console.log(action.payload.user)
      return {
        ...prevState,
        isSignedOut: false,
        user: action.payload.user
      }

    case ACTIONS.SIGN_OUT:
      return {
        ...prevState,
        isSignedOut: true,
      }

    case ACTIONS.CURRENT_USER_EXITS:
      return {
        ...prevState,
        isSignedOut: false,
        loading: false
      }
      
    default: 
      throw new Error()
  }
}

const initialUserState = {
  loading: true,
  isSignedOut: true,
  user: null
}


const Stack = createStackNavigator()

export default function App() {
  const {user, loading, error} = useAuthUser()

  const [userState, dispatchUser] = useReducer(reducer, initialUserState)

  useEffect(() => {

    // ! NORMALLY THIS SECTION WILL BE ASYNC
    // ! IN THAT CASE WRAP THIS PART IN A FUNCTION CALLED ASYNC

    if (user) { dispatchUser({ type: ACTIONS.CURRENT_USER_EXITS }) }
  }, [user])

  const authContext = useMemo(() => ({
      getUserInfo: () => {
        if(user){
          return user
        }
      },
      signIn: async (email: string, password: string) => {
        try {
          const loggedInUser = await auth.signInWithEmailAndPassword(email, password)
          dispatchUser({ type: ACTIONS.SIGN_IN, payload: { user: loggedInUser?.user } })
        } catch (error) {
          
        }
      },
      signOut: async() => {
        await auth.signOut()
        dispatchUser({ type: ACTIONS.SIGN_OUT })
      },
      registerUser: async (email: string, password: string, profileData: any) => {
        try {
          const newUser = await auth.createUserWithEmailAndPassword(email, password)
          await newUser.user?.updateProfile(profileData)

          dispatchUser({ type: ACTIONS.SIGN_IN, payload: { user: newUser?.user } })
        } catch (error) {
          console.error(error)
        }
      }
    })
    , []
  )


  


  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar style="auto"/>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            {loading && !user && (
              <Stack.Screen name="Loading" component={LoadingScreen} />
            )}
            
            {!userState.isSignedOut ? (
              <>
                {/* When user are logged in */}
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="AddChat" component={AddChatScreen}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
                <Stack.Screen name="ChatSettings" component={ChatSettingScreen}/>
                <Stack.Screen name="AddUser" component={AddUserToChat}/>
              </>
              ) : (  
              <>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen}/>
              </>
            )}
          </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
