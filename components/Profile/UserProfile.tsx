import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { logOut } from '../../auth/auth-functions'
const UserProfile = ({ name }: any) => {
	return (
		<View>
			<Text>Hello {name}</Text>
			<Button 
				title="signOut"
				onPress={logOut}
			/>
		</View>
	)
}

export default UserProfile
