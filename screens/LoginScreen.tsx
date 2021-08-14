import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Image, Input,  Button } from 'react-native-elements';
import React, { useContext, useLayoutEffect, useState } from 'react';
import {  Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import tailwind from 'tailwind-rn';
import { login } from '../auth/auth-functions';


const LoginScreen = ({ navigation }: { navigation: any }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)

	const handleLogin = () => {
		
		try {
			login(email, password)
		} catch (error) {
			console.log(error)
		}

	}


	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
					<>
						<Image 
							source={{
								uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png"
							}}
							style={{ width: 100, height: 100 }}
						/>
						<View style={tailwind('items-center w-80 mt-10')}>
							<Input	
								placeholder="Email"
								onChangeText={(text: string) => setEmail(text)}
								value={email}
								leftIcon={
									<Icon
										name='mail'
										size={24}
										color='black'
									/>
								}
								textContentType="emailAddress"
								label={"Your email here"}
								errorStyle={{ color: 'red', fontWeight: 'bold'}}
							/>
							<Input
								placeholder="Password"
								onChangeText={(password: string) => setPassword(password)}
								label={"Your password here"}
								textContentType="password"
								leftIcon={
									<Icon
										name='lock'
										size={24}
										color='black'
									/>
								}
								value={password}
								secureTextEntry={true}
							/>
							<Button
								title="Login"
								containerStyle={styles.button}
								onPress={() => handleLogin()}
							/>
							<Button 
								title="Register"
								containerStyle={styles.button}
								type="outline"
								onPress={() => navigation.navigate("Register")}
							/>
							{error && (
								<Text>There was an error. Please try again later</Text>
							)}
						</View>

						<View style={{ height: 150 }}></View>
					</>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: 'white'
	},
	inputContainer: {
		marginTop: 10,
		width: 300,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 200,
		marginTop: 10,
	}
})