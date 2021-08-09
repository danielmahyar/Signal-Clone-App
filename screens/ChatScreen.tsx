import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import tailwind from 'tailwind-rn'
import { SafeAreaView } from 'react-native-safe-area-context'
import firebase from 'firebase'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useAuthUser } from '../auth/auth-hook'

type Message = {
	photoURL: string;
	text: string;
	timestamp: any;
	displayName: string;
	uid: string;
}

export const ChatScreen = ({ navigation, route }: any) => {
	const [message, setMessage] = useState('')
	const { chatId, chatName } = route.params
	const { user } = useAuthUser()
	const ref = firestore.collection(`chats/${chatId}/messages`)
	const [snapshots, loading, error] = useCollection(ref.orderBy('timestamp'))

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Back',
			headerTitle: () => (
				<View style={tailwind('flex-row items-center justify-center')}>
					<Avatar 
						source={{ uri: "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"}}
						rounded
					/>
					<Text style={tailwind('text-white font-bold ml-2')}>{route.params.chatName}</Text>
				</View>
			),
			headerRight: () => (
				<View style={tailwind('flex-row items-center justify-center')}>
					<TouchableOpacity>
						<Icon 
							name="phone"
							size={30}
							style={tailwind('mr-3 bg-white rounded-full p-1')}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon 
							name="videocam"
							size={30}
							style={tailwind('mr-3 bg-white rounded-full p-1')}
						/>
					</TouchableOpacity>

				</View>
			)
		})
	}, [])

	const handleMessageSend = async() => {
		if(message === '') return 
		Keyboard.dismiss()
		setMessage('')
		const newMessage = ref.add({
			displayName: user?.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			text: message,
			photoURL: user?.photoURL,
			uid: user?.uid
		})
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				behavior={'padding'}
				style={{ flex: 1, backgroundColor: 'white' }}
				keyboardVerticalOffset={80}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={tailwind('flex-1')}>
					<>
						<ScrollView style={tailwind('flex-1')}>
							<View style={tailwind('relative')}>
								{snapshots?.docs.map((snapshot: any) => {
									const { photoURL, displayName, text, timestamp, uid }: Message = snapshot.data()
									
									if(user?.uid === uid) return (
										<View key={snapshot.id}>
											<Avatar 
												source={{ uri: photoURL }}
												rounded
												size={24}
											/>
											<Text>I Sent {text}</Text>
										</View>

									)
									return(
										<View key={snapshot.id}>
											<Avatar 
												source={{ uri: photoURL }}
												rounded
												size={24}
											/>
											<Text>{displayName} sent a message: {text}</Text>
										</View>
									)
								})}
							</View>
						</ScrollView>
						<View style={tailwind('w-full')}>
							<Input 
								placeholder="Message Here"
								style={tailwind('bottom-0 flex-1 p-2 bg-gray-200 rounded-full')}
								inputContainerStyle={tailwind('border-transparent h-14')}
								onChangeText={(text: string) => setMessage(text)}
								onSubmitEditing={handleMessageSend}
								value={message}
								rightIcon={
									<TouchableOpacity onPress={handleMessageSend}>
										<Icon 
											name="send"
											size={30}
											style={tailwind('pl-2')}
										/>
									</TouchableOpacity>
								}
							/>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
