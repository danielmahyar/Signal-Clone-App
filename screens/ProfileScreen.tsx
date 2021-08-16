import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthContext } from '../auth/auth-context'
import { logOut } from '../auth/auth-functions'
import { getUserInfo } from '../database/firestore-query'

type UserRoute = {
	params: {
		uid?: any;
	}
}

const ProfileScreen = ({ navigation, route }: { navigation: any, route: UserRoute}) => {
	const [userProfile, setUserProfile] = useState<any>(null)
	const { user } = useContext(AuthContext)
	const { uid } = route.params
	
	useEffect(() => {
		const async = async() => {
			if(user?.uid === uid) {
				setUserProfile(user)
			} else {
				try {
					const user = await getUserInfo(uid)
					setUserProfile(user)
					
				} catch (error) {
					console.log(error)
				}
			}
		}

		async()

	}, [])

	const handleSignOut = async() => {
		await logOut()
	}

	return (
		<SafeAreaProvider>
			<Text>Hello {userProfile?.displayName}</Text>
			<Button 
				title="Sign Out" 
				onPress={handleSignOut}
			/>
		</SafeAreaProvider>
	)
}

export default ProfileScreen
