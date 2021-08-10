import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, LayoutChangeEvent, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, _ScrollView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import tailwind from 'tailwind-rn'
import { SafeAreaView } from 'react-native-safe-area-context'
import firebase from 'firebase'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
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
	const [newMessageNotification, setMsgNoti] = useState(false)
	const scrollRef = useRef(null)
	const { chatId, chatName } = route.params
	const { user } = useAuthUser()
	const ref = firestore.collection(`chats/${chatId}/messages`)
	const [snapshots, loading, error] = useCollection(ref.orderBy('timestamp'))

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Chat',
			headerAlignTitle: 'left',
			headerBackTitleVisible: false,
			headerTitle: () => (
				<View style={tailwind('flex-row items-center')}>
					<Avatar 
						rounded
						source={{ uri: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png' }}
					/>
					<Text style={tailwind('text-white ml-2 font-bold')}>{chatName}</Text>
				</View>
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

	useEffect(() => {
		if(snapshots) return setMsgNoti(false)
	}, [])

	useEffect(() => {
		const ref: any = scrollRef.current
		setMsgNoti(true)
		ref.scrollToEnd({ animated: true, duration: 300 });
	}, [snapshots])

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
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
			keyboardVerticalOffset={80}
		>
			<StatusBar style="light"/>
			
			<TouchableWithoutFeedback style={{ flex: 1, position: 'relative' }} onPress={Keyboard.dismiss}>
				<>          
					{newMessageNotification && (
						<Text>NEW MESSAGE</Text>
					)}
					<ScrollView 
						contentContainerStyle={{ paddingTop: 10 }}
						ref={scrollRef}
						onScrollEndDrag={() => setMsgNoti(false)}
					>
						{/* Chat */}
						{snapshots?.docs.map((snapshot: any) => {
							const { photoURL, text, timestamp, displayName, uid }: Message = snapshot.data()

							if(user?.uid === uid) return (
								<View key={snapshot.id} style={styles.receiver}>
									<Avatar 
										source={{ uri: photoURL }}
										rounded
										containerStyle={{
											position: 'absolute',
											bottom: -15,
											right: -15
										}}
									/>
									<Text style={styles.senderName}>{displayName}</Text>
									<Text style={styles.receiverText}>{text}</Text>
								</View>
							)
							
							{/* From Sender */}
							return (
								<View key={snapshot.id} style={styles.sender}>
									<Avatar 
										source={{ uri: photoURL }}
										rounded
										containerStyle={{
											position: 'absolute',
											bottom: -15,
											left: -5
										}}
									/>
									<Text style={styles.recieverName}>{displayName}</Text>
									<Text style={styles.senderText}>{text}</Text>
								</View>
							)

						})}
					</ScrollView>
					<View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: 15, marginBottom: 10 }}>
						<TextInput 
							placeholder="Enter Message Here"
							placeholderTextColor="black"
							onChangeText={(text: string) => setMessage(text)}
							value={message}
							onSubmitEditing={handleMessageSend}
							style={{ bottom: 0, height: 40, backgroundColor: '#ECECEC', flex: 1, marginRight: 15, padding: 10, borderRadius: 30 }}
						/>

						<TouchableOpacity onPress={handleMessageSend} activeOpacity={0.5}>
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