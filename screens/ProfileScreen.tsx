import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthContext } from '../auth/auth-context'
import OtherProfile from '../components/Profile/OtherProfile'
import UserProfile from '../components/Profile/UserProfile'
import { getUserInfo } from '../database/firestore-query'

type UserRoute = {
	params: {
		uid?: any;
	}
}

const ProfileScreen = ({ navigation, route }: { navigation: any, route: UserRoute}) => {
	const [userProfile, setUserProfile] = useState<any>(null)
	const [isUser, setIsUser] = useState(false) 
	const { user } = useContext(AuthContext)
	const { uid } = route.params
	
	useEffect(() => {
		const async = () => {
			if(user?.uid === uid) {
				setUserProfile(user)
				setIsUser(true)
			} else {
				getUserInfo(uid).then(user => {
					setIsUser(false)
					setUserProfile(user)
				}).catch(err => console.log(err))
			}
		}

		async()

	}, [])

	return (
		<SafeAreaProvider>
			{isUser && userProfile ? (
				<UserProfile 
					name={userProfile?.displayName}
				/>
			) : (		
				<OtherProfile
					name={userProfile?.displayName}
				/>
			)}
		</SafeAreaProvider>
	)
}

export default ProfileScreen
