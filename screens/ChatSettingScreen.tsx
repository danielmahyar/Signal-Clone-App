import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Text } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import ChatSettingListItem from '../components/ChatSettingListItem'
import { deleteChat } from '../database/firestore-query'

const ChatSettingScreen = ({ navigation, route }: any) => {
	const { chatId, chatName, chatPeople, photoURL } = route.params
	const lists = [
		{
			title: 'Group Settings',
			listItems: [
				{
					iconName: 'adduser',
					title: 'Add an User to the Chat',
					nav: 'AddUser',
					payload: { 
						chatId,
						chatName,
						chatPeople
					}
				}
			]
		}
	]

	const handleChatDelete = async () => {
		await deleteChat(chatId)
		navigation.replace("Home")
	}

	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
					<Avatar 
						source={{ uri: photoURL }}
						size={100}
						rounded
					/>
					<Text h2>{route.params.chatName}</Text>
						<TouchableOpacity style={{  alignItems: 'center', justifyContent: 'center', marginRight: 10 }} onPress={() => navigation.navigate('AddUser', { chatId, chatPeople, chatName })}>
							<AntDesign 
								name="adduser"
								size={30}
							/>
							<Text>Add user</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => handleChatDelete()}>
							<AntDesign 
								name="delete"
								size={30}
							/>
							<Text style={{ fontWeight: 'bold' }}>Delete chat</Text>
						</TouchableOpacity>
				</View>
				<ScrollView style={{ flex: 1 }}>

					{lists.map((list, index) => (
						<ChatSettingListItem 
							key={index++}
							title={list.title}
							listItems={list.listItems}
						/>
					))}

				</ScrollView>

		</SafeAreaProvider>
	)	
}

export default ChatSettingScreen
