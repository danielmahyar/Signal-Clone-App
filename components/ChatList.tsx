import React from 'react'
import { useNavigation } from '@react-navigation/core'
import ChatListItem from './ChatListItem'

const ChatList = ({ search, snapshots }: any) => {
	const navigation = useNavigation()
	const filteredSearch: any[] = (snapshots?.docs) ? snapshots?.docs.filter((n:any) => n.data().name.toLowerCase().includes(search.toLowerCase())) : []
	return (
		<>
			{filteredSearch.map((chat: any) => {
				const { name } = chat.data()
				return (
					<ChatListItem
						key={chat.id}
						navigation={navigation}
						chatId={chat.id}
						chatName={name}
					/>
				)
			})}
		</>
	)
}
export default ChatList
