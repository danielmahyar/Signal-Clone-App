import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import AddChatScreen from './screens/AddChatScreen';
import { useAuthUser } from './auth/auth-hook';
import { ChatScreen } from './screens/ChatScreen';

const Stack = createStackNavigator()

export default function App() {
  const {user, loading, error} = useAuthUser()

  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  }

  return (
      <NavigationContainer>
        <StatusBar style="auto"/>
          <Stack.Navigator screenOptions={globalScreenOptions}>
            {loading && !user && (
              <Stack.Screen name="Loading" component={LoadingScreen} />
            )}
            
            {user ? (
              <>
                {/* When user are logged in */}
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="AddChat" component={AddChatScreen}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
              </>
              ) : (  
              <>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen}/>
              </>
            )}
          </Stack.Navigator>
      </NavigationContainer>
  )
}
