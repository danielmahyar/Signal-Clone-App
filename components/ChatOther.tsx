import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Message } from '../screens/ChatScreen'

const ChatOther = ({ photoURL, displayName, text }: Message) => {
	return (
		<TouchableOpacity>
			<View style={styles.sender}>
				<Avatar 
					source={{ uri: photoURL }}
					rounded
					containerStyle={{
						position: 'absolute',
						bottom: -15,
						left: -5
					}}
				/>
				<Text style={styles.senderName}>{displayName}</Text>
				<Text style={styles.senderText}>{text}</Text>
			</View>
		</TouchableOpacity>

	)
}

export default ChatOther

const styles = StyleSheet.create({
	sender: {
		padding: 15,
		backgroundColor: "#2B68E6",
		alignSelf: 'flex-start',
		borderRadius: 20,
		margin: 15,
		maxWidth: "70%",
		position: "relative"
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
})