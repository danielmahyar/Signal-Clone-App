import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { Message } from '../screens/ChatScreen'

const ChatUser = ({ photoURL, displayName, text }: Message) => {
	return (
		<View style={styles.receiver}>
			<Avatar
				source={{ uri: photoURL }}
				rounded
				containerStyle={{
					position: 'absolute',
					bottom: -15,
					right: -15,
					zIndex: 5
				}}
			/>
			<Text style={styles.recieverName}>{displayName}</Text>
			<TouchableOpacity style={styles.textContainer}>
				<Text style={styles.receiverText}>{text}</Text>
			</TouchableOpacity>
		</View>	
	)
}

export default ChatUser

const styles = StyleSheet.create({
	receiver: {
		alignSelf: 'flex-end',
		marginRight: 20,
		marginBottom: 30,
		maxWidth: "70%",
		position: "relative"
	},
	textContainer: {
		backgroundColor: "#ECECEC",
		borderRadius: 20,
		padding: 15,
	},
	receiverText: {
		fontWeight: '300'
	},
	recieverName: {
		position: 'absolute',
		top: -18,
		fontSize: 10,
		right: 10,
		padding: 5,
	}
})