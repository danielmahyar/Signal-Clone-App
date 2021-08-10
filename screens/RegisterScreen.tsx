import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { Button, Input, Text } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import tailwind from 'tailwind-rn'
import { auth, firestore } from '../firebase';

const RegisterScreen = ({ navigation }: any) => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleRegister = async () => {
		try {
			const newUserFirestore = {
				friends: []
			}
			
			//!THE PROBLEM HERE. USER LOADS BEFORE IT CAN UPDATE DISPLAYNAME AND PHOTOURL
			const newUser = await auth.createUserWithEmailAndPassword(email, password)
			await newUser.user?.updateProfile({
				displayName: username,
				photoURL: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
			})
			
			await firestore.collection(`users`).doc(newUser?.user?.uid).set(newUserFirestore)

			const crediential: any = newUser.credential
			await auth.signInWithEmailAndPassword(email, password)

		} catch (error) {
			console.log(error)
		}
		
	}


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