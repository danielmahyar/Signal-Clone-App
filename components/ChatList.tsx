import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/core'

const ChatList = ({ snapshots }: any) => {
	const navigation = useNavigation()
	return (
		<>
			{snapshots?.docs.map((chat: any) => {
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
