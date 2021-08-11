import React, { useState, useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { Button, Input, Text } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import tailwind from 'tailwind-rn'
import { AuthContext } from '../App';
import { useAuthUser } from '../auth/auth-hook';
import { auth, firestore } from '../firebase';

const RegisterScreen = ({ navigation }: any) => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { registerUser }: any = useContext(AuthContext)

	const handleRegister = () => {

		const profileData = {
			displayName: username,
			photoURL: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
		}

		registerUser(email, password, profileData)
		
	}
	
	// ! 

	return (
		<KeyboardAvoidingView style={styles.container} behavior={'padding'} onTouchStart={() => Keyboard.dismiss()}>
			<View style={tailwind('')} >
				<Text style={tailwind('text-center')} h3>Create your Signal Account</Text>
				<View style={tailwind('flex w-80 items-center justify-center mt-10 rounded-lg')}>
					<Input 
						placeholder="Enter your username"
						leftIcon={
							<Icon
								name='person'
								size={24}
								color='black'
							/>
						}
						onChangeText={(text: string) => setUsername(text)}
						value={username}
					/>
					<Input 
						placeholder="Enter your email"
						textContentType="emailAddress"
						leftIcon={
							<Icon
								name='mail'
								size={24}
								color='black'
							/>
						}
						onChangeText={(text: string) => setEmail(text)}
						value={email}
					/>
					<Input 
						placeholder="Enter your password"
						textContentType="newPassword"
						secureTextEntry
						leftIcon={
							<Icon
								name='lock'
								size={24}
								color='black'
							/>
						}
						onChangeText={(text: string) => setPassword(text)}
						value={password}
						onSubmitEditing={handleRegister}
					/>
				</View>
				<Button 
					title="Register Now"
					raised={true}
					containerStyle={tailwind('mt-5')}
					buttonStyle={tailwind('h-12')}
					onPress={handleRegister}
				/>
				<Button 
					title="Go Back"
					type="outline"
					containerStyle={tailwind('mt-5')}
					buttonStyle={tailwind('h-10')}
					icon={
						<Icon
						  name="arrow-left"
						  size={25}
						  color="black"
						/>
					}
					onPress={navigation.goBack}
				/>
			</View>
			<View style={{ height: 150 }}></View>
		</KeyboardAvoidingView>
	)
}

export default RegisterScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	}
})