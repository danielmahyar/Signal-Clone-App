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
import { AuthContext } from './auth/auth-context';
import AddUserToChat from './screens/AddUserToChat';
import { auth, firestore } from './firebase';
import useAuthRedux, { REDUCER_ACTIONS } from './auth/auth-redux';


const Stack = createStackNavigator()

export default function App() {
  const { user, userState, dispatchUser, loading } = useAuthRedux()

  // ! Contains state management for user including the user itself
  const authContextValue = useMemo(() => ({
      signIn: async (email: string, password: string) => {
        try {
          await auth.signInWithEmailAndPassword(email, password)
          dispatchUser({ type: REDUCER_ACTIONS.SIGN_IN })
        } catch (error) {
          console.log(error)
        }
      },
      signOut: async() => {
        await auth.signOut()
        dispatchUser({ type: REDUCER_ACTIONS.SIGN_OUT })
      },
      registerUser: async (email: string, password: string, profileData: any) => {
        try {
          const newUser = await auth.createUserWithEmailAndPassword(email, password)
          await newUser.user?.updateProfile(profileData)
          await firestore.collection('users').add({ friends: [] })

          if(user){
            dispatchUser({ type: REDUCER_ACTIONS.SIGN_IN })
          }
        } catch (error) {
          console.error(error)
        }
      },
      user
    })
    , [user]
  )

  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  }

  return (
    <AuthContext.Provider value={authContextValue}>
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
