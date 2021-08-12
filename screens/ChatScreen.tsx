import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, LayoutChangeEvent, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, _ScrollView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import tailwind from 'tailwind-rn'
import firebase from 'firebase'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import ChatUser from '../components/ChatUser'
import ChatOther from '../components/ChatOther'
import useAuthRedux from '../auth/auth-redux'
import { AuthContext } from '../auth/auth-context'

export type Message = {
	photoURL: string;
	text: string;
	timestamp: any;
	displayName: string;
	uid: string;
}

/**
 * TODO: Implement loading and error for firestore loads
 * @returns {JSX} 
 */

const ChatScreen = ({ navigation, route }: any) => {
	const [userMessage, setUserMessage] = useState('')
	const scrollRef = useRef(null)
	const { user } = useContext(AuthContext)
	const { chatId, chatName } = route.params

	const ref = firestore.collection(`chats/${chatId}/messages`)
	const [snapshots, loading, error] = useCollection(ref.orderBy('timestamp'))

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Chat',
			headerAlignTitle: 'left',
			headerBackTitleVisible: false,
			headerTitle: () => (
				<TouchableOpacity onPress={() => navigation.navigate('ChatSettings')}>
					<View style={tailwind('flex-row items-center')}>
						<Avatar 
							rounded
							source={{ uri: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png' }}
						/>
						<Text style={tailwind('text-white ml-2 font-bold')}>{chatName}</Text>
					</View>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: 80,
					marginRight: 20
				}}>
					<TouchableOpacity>
						<FontAwesome 
							name="video-camera"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons 
							name="call"
							size={24}
							color="white"
						/>
					</TouchableOpacity>

				</View>
			),
			headerLeft: () => (
				<TouchableOpacity style={tailwind('ml-5')} onPress={navigation.goBack}>
					<AntDesign 
						name="arrowleft"
						size={24}
						color="white"
					/>
				</TouchableOpacity>
			)
		})
	}, [])

	const handleMessageSend = async() => {
		if(userMessage === '') return 
		Keyboard.dismiss()
		
		const newMessage = {
			displayName: user?.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			text: userMessage,
			photoURL: user?.photoURL,
			uid: user?.uid
		}
		
		await ref.add(newMessage)

		setUserMessage('')
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
			keyboardVerticalOffset={80}
		>
			<StatusBar style="light"/>
			<TouchableWithoutFeedback style={{ flex: 1, position: 'relative' }} onPress={Keyboard.dismiss}>
				<>          
					<ScrollView 
						contentContainerStyle={{ paddingTop: 10 }}
						ref={scrollRef}
					>
						{/* Chat */}
						{snapshots?.docs.map((snapshot: any) => {
							const docId = snapshot.id
							const data: Message = snapshot.data()

							if(user?.uid === data.uid) {
								//Messages from the user
								return (
									<ChatUser
										key={docId}
										{...data} 
									/>
								)
							} else {
								//Messages from others
								return(
									<ChatOther 
										key={docId}
										{...data}
									/>
								)
							}

						})}
					</ScrollView>
					
					<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: 15, marginBottom: 10 }}>
						<TextInput 
							placeholder="Enter Message Here"
							placeholderTextColor="black"
							onChangeText={(text: string) => setUserMessage(text)}
							value={userMessage}
							onSubmitEditing={handleMessageSend}
							style={{ bottom: 0, height: 40, backgroundColor: '#ECECEC', flex: 1, marginRight: 15, padding: 10, borderRadius: 30 }}
						/>

						<TouchableOpacity 
							onPress={handleMessageSend} 
							activeOpacity={0.5}
						>
							<Ionicons 
								name="send"
								size={24}
								color="#2B68E6"
							/>
						</TouchableOpacity>
					</View>
				</>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

export default ChatScreen

const styles = StyleSheet.create({
	receiver: {
		padding: 15,
		backgroundColor: "#ECECEC",
		alignSelf: 'flex-end',
		borderRadius: 20,
		marginRight: 20,
		marginBottom: 30,
		maxWidth: "70%",
		position: "relative"
	},
	sender: {
		padding: 15,
		backgroundColor: "#2B68E6",
		alignSelf: 'flex-start',
		borderRadius: 20,
		margin: 15,
		maxWidth: "70%",
		position: "relative"
	},
	receiverText: {
		fontWeight: 'bold'
	},
	senderText: {
		fontWeight: 'bold',
		color: "white",
		marginLeft: 10,
	},
	senderName: {
		position: 'absolute',
		top: -18,
		fontSize: 10,
		right: 10,
		padding: 5,
	},
	recieverName: {
		position: 'absolute',
		top: -18,
		fontSize: 10,
		right: 10,
		padding: 5,
	}
})