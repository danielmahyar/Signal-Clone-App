import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { ListItem, Text } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import ChatSettingListItem from '../components/ChatSettingListItem'

const ChatSettingScreen = ({ navigation, route }: any) => {
	const lists = [
		{
			title: 'Group Settings',
			listItems: [
				{
					iconName: 'adduser',
					title: 'Add User to the Chat',
					nav: 'AddUser'
				}
			]
		},
		{
			title: 'Chat Settings',
			listItems: [
				{
					iconName: 'adduser',
					title: 'Add User to the Chat',
					nav: 'AddUser'
				}
			]
		}
	]

	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
					<Avatar 
						source={{ uri: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png' }}
						size={100}
						rounded
					/>
					<Text h2>Test</Text>
					<View>
						<AntDesign 
							name="adduser"
						/>
					</View>
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
