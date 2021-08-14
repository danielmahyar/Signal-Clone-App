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
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const Stack = createStackNavigator()

export default function App() {
  const [user, userLoading, userError] = useAuthState(auth)

  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  }

  const AuthContextValues = {user, userLoading, userError}

  return (
    <AuthContext.Provider value={AuthContextValues}>
      <NavigationContainer>
        <StatusBar style="auto"/>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            {userLoading && !user && (
              <Stack.Screen name="Loading" component={LoadingScreen} />
            )}
            
            {user ? (
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
