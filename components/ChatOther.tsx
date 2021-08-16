import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Message } from '../screens/ChatScreen'

const ChatOther = ({ photoURL, displayName, text, navigation, uid }: Message) => {
	const handleNav = () => {
		navigation.navigate('Profile', { uid, isSelf: false })
	}

	return (
		<View style={styles.container}>
			<View style={styles.sender}>
				<Avatar 
					source={{ uri: photoURL }}
					rounded
					containerStyle={{
						position: 'absolute',
						bottom: -15,
						left: -5,
						zIndex: 5
					}}
				/>
				<Text style={styles.senderName}>{displayName}</Text>
				<TouchableOpacity style={styles.textContainer} onPress={handleNav}>
					<Text style={styles.senderText}>{text}</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ChatOther

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-start',
		margin: 15,
		maxWidth: "70%",
	},
	textContainer: {
		padding: 15,
		backgroundColor: "#2B68E6",
		borderRadius: 20,
	},
	sender: {
		position: "relative"
	},
	senderText: {
		fontWeight: '500',
		color: "white",
		marginLeft: 10,
	},
	senderName: {
		position: 'absolute',
		top: -18,
		fontSize: 10,
		left: 15,
		padding: 5,
	},
})