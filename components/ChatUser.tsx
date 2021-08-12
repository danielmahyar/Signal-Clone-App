import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
					right: -15
				}}
			/>
			<Text style={styles.recieverName}>{displayName}</Text>
			<Text style={styles.receiverText}>{text}</Text>
		</View>	
	)
}

export default ChatUser

const styles = StyleSheet.create({
	receiver: {
		padding: 15,
		backgroundColor: "#ECECEC",
		alignSelf: 'flex-end',
		borderRadius: 20,
		marginRight: 20,
		marginBottom: 30,
		maxWidth: "70%",
		position: "relative"
	},
	receiverText: {
		fontWeight: 'bold'
	},
	recieverName: {
		position: 'absolute',
		top: -18,
		fontSize: 10,
		right: 10,
		padding: 5,
	}
})