import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { firestore } from '../firebase'

const ChatListItem = ({ navigation, chatName, chatId }: any) => {
	const [dataState, setDataState] = useState(false)
	const [data, setData] = useState<any>(null)
	const query = firestore.collection('chats').doc(chatId).collection('messages').orderBy('timestamp').limitToLast(1)
	const [snapshots, loading, error] = useCollection(query)

	useEffect(() => {
		if(snapshots && snapshots.docs[0]) {
			setData(snapshots.docs[0].data())
			setDataState(true)
		} else if (snapshots){
			setDataState(true)
			setData(null)
		}
	}, [snapshots])

	return (
		<>
			{dataState && (
				<TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId, chatName })}>
					<ListItem bottomDivider>
						<Avatar 
							rounded
							source={{
								uri: (data) ? data.photoURL : 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
							}}
						/>

						<ListItem.Content>
							<ListItem.Title>{chatName}</ListItem.Title>
							<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
								{(data) ? `${data.displayName}: ${data.text}` : 'No messages'}
							</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				</TouchableOpacity>
			)}	
		</>
	)
}

export default ChatListItem
