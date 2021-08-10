import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, View, TouchableWithoutFeedback, Platform } from 'react-native'
import { Button, Icon, Input, Text } from 'react-native-elements'
import { firestore } from '../firebase'
import firebase from 'firebase'
import tailwind from 'tailwind-rn'

function AddChatScreen({ navigation, route }: any) {
	const [chatName, setChatName] = useState("")
	const { userId, username } = route.params
	
	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Create A New Chat',
			headerBackTitle: 'Chats'
		})
	}, [])

	const handleChatCreate = async() => {
		if(chatName === '') return 

		try {
			const newChatData = {
				name: chatName,
				people: [userId],
				created: firebase.firestore.FieldValue.serverTimestamp()
			}
			const newChat = await firestore.collection('chats').add(newChatData)			
			navigation.replace('Home', { chatId: newChat.id, chatName })
		} catch (error) {
			console.error(error)
		}


	}	

	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={tailwind('flex-grow')}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={tailwind('p-8 flex-grow justify-center items-center')}>
					<View>
						<Text h3>Create A New Chatroom</Text>
					</View>
					<View style={tailwind('w-full mt-5')}>
						<Input 
							placeholder="My Awesome Chat"
							leftIcon={
								<Icon 
									name="message"
								/>
							}
							inputStyle={tailwind('ml-2')}
							onChangeText={(text: string) => setChatName(text)}
							value={chatName}
							onSubmitEditing={handleChatCreate}
						/>
					</View>
					<Button 
						title='Create Chat'
						style={tailwind('w-52')}
						buttonStyle={tailwind('h-12')}
						raised
						onPress={handleChatCreate}
					/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

export default AddChatScreen
