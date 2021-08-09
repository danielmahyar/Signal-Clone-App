import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import tailwind from 'tailwind-rn'
import { firestore } from '../firebase'

const firestoreQuery = firestore.collection('chats')

const ChatList = ({ navigation }: any) => {
	const [snapshots, loading, error ] = useCollectionOnce(firestoreQuery)
	return (
		<>
			{snapshots?.docs.map((chat) => {
				const { name } = chat.data()
				return (
					<TouchableOpacity key={chat.id} onPress={() => navigation.navigate('Chat', { chatId: chat.id, chatName: name })}>
						<ListItem topDivider>
							<Avatar 
								rounded
								source={{
									uri: "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
								}}
							/>

							<ListItem.Content>
								<ListItem.Title>{name}</ListItem.Title>
								<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat incidunt officiis adipisci quae quis obcaecati porro sunt odit veniam, ab quod consequuntur suscipit laborum explicabo dolores? Nobis quis assumenda inventore.
								Porro aperiam nobis molestiae sequi. Quae minima animi facilis adipisci numquam officia hic veritatis unde. Culpa tenetur voluptatum atque nesciunt aperiam repellendus nam assumenda, aspernatur est cum! Laudantium, necessitatibus. Iste.</ListItem.Subtitle>
							</ListItem.Content>
						</ListItem>
					</TouchableOpacity>
				)
			})}
		</>
	)
}
export default ChatList
