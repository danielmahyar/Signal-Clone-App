import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import ChatListItem from './ChatListItem'

const ChatList = ({ user, search, snapshots }: any) => {
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
