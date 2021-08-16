import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'

const ChatSettingListItem = ({ title, listItems }: any) => {
	const navigation = useNavigation()
	return (
		<View>
			<Text h4 style={{ marginBottom: 10, marginLeft: 10 }}>{title}</Text>
			{listItems.map((listItem: any, index: number) => (
				<TouchableOpacity key={index++} onPress={() => navigation.navigate(listItem.nav, {...listItem?.payload})}>
					<ListItem topDivider style={{ flex: 1 }}>
						<AntDesign 
							name={listItem.iconName}
							size={40}
						/>
						<ListItem.Content>
							<ListItem.Title>{listItem.title}</ListItem.Title>
						</ListItem.Content>
					</ListItem>
				</TouchableOpacity>
			))}

		</View>
	)
}

export default ChatSettingListItem
