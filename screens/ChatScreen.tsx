import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
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
import { AuthContext } from '../auth/auth-context'
import Loading from '../components/Loading'

export type Message = {
	photoURL: string;
	text: string;
	timestamp: any;
	displayName: string;
	uid: string;
	navigation: any;
	handleLongPress?: any;
	messageId: string;
}

/**
 * TODO: Implement loading and error for firestore loads
 * @returns {JSX} 
 */

const ChatScreen = ({ navigation, route }: any) => {
	const [userMessage, setUserMessage] = useState('')
	const [pagination, setPagination] = useState<number>(10)
	const [listHeight, setListHeight] = useState(0)
	const scrollRef = useRef<any>(null)
	const { user } = useContext(AuthContext)
	const { chatId, chatName, chatPeople } = route.params
	const ref = firestore.collection(`chats/${chatId}/messages`)
	const [messages, loading, error]: any = useCollection(ref.orderBy('timestamp').limitToLast(pagination))
	
	useLayoutEffect(() => {
		let lastIndex: number = 0
		let photoURL = 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png' 

		if(messages && messages.docs.length > 0) {
			lastIndex = messages.docs.length - 1
			photoURL = messages?.docs[lastIndex].data().photoURL
		}

		navigation.setOptions({
			title: 'Chat',
			headerAlignTitle: 'left',
			headerBackTitleVisible: false,
			headerTitle: () => (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<TouchableOpacity onPress={() => navigation.navigate('ChatSettings', { chatName, photoURL, chatId, chatPeople })}>
						<View style={tailwind('flex-row items-center')}>
							<Avatar 
								rounded
								source={{ uri: photoURL }}
							/>
							<Text style={tailwind('text-white ml-2 font-bold')}>{chatName}</Text>
						</View>
					</TouchableOpacity>
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
	}, [messages])

	
	useEffect(() => {
		scrollRef?.current?.scrollTo({ y: listHeight })
	}, [messages, listHeight])

	const handleMessageSend = async() => {
		if(userMessage === '') return 
		
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

	const handleScrollTop = (e: any) => {
		const { targetContentOffset, contentOffset } = e.nativeEvent
		const contentOffsetSpot = -130
		const condition = targetContentOffset?.y === 0 && contentOffset.y < contentOffsetSpot

		if(condition) {
			setPagination(prevState => (prevState + 10))
		}
	}

	const handleScroll = () => {
		scrollRef.current.scrollToEnd({
			animated: true,
		})
	}

	const handleLongPress = (messageId: string) => {
		console.log(`${messageId} was longpressed`)
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
					{loading && (
						<Loading />
					)}     
					<ScrollView
						scrollsToTop={true}
						onScrollEndDrag={handleScrollTop}
						onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
						onContentSizeChange={(w, h) => setListHeight(h)}
						ref={scrollRef}
					>  
					
						{/* Chat */}
						{messages?.docs.map((message: any) => {
							const docId = message.id
							const data: Message = {...message.data(), messageId: docId}

							if(user?.uid === data.uid) {
								//Messages from the user
								return (
									<ChatUser
										key={docId}
										{...data}
										handleLongPress={handleLongPress}
									/>
								)
							} else {
								//Messages from others
								return(
									<ChatOther
										key={docId}
										{...data}
										navigation={navigation}
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
							onFocus={() => scrollRef?.current?.scrollTo({ y: listHeight + 180, animated: true })}
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
