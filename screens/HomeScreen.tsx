import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from "react-native"
import { SearchBar } from 'react-native-elements'
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';
import Icon  from '@expo/vector-icons/AntDesign'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import tailwind from 'tailwind-rn';
import { auth } from '../firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatList from '../components/ChatList';
import { useAuthUser } from '../auth/auth-hook';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase'

// Using SearchBarBaseProps instead of SearchBarDefaultProps & SearchBarAndroidProps & SearchBarIOSProps
const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;

const HomeScreen = ({ navigation, route }: any) => {
	const [search, setSearch] = useState("")
	const { user } = useAuthUser()
	const firestoreQuery = firestore.collection('chats').where('people', 'array-contains', user?.uid)
	const [snapshots, loading, error ] = useCollection(firestoreQuery)
	
	useEffect(() => {
		if(user === null){
			
		}
	}, [])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Welcome ${user?.displayName}`,
			headerStyle: {
				backgroundColor: 'transparent'
			},
			headerTitleStyle: {
				textAlign: 'center',
				color: 'black'
			},
			headerLeft: () => (
				<View style={tailwind('flex justify-center items-center ml-5')}>
					<TouchableOpacity onPress={handleSignOut}>
						<Avatar
							titleStyle={tailwind('font-bold')}
							rounded
							size={35}
							source={{
								uri: user?.photoURL || ''
							}}
						/>
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View style={tailwind('flex flex-row items-center justify-between w-full mr-5')}>
					<TouchableOpacity onPress={() => navigation.navigate('ChatSettings')}>
						<Icon 
							name='camerao'
							size={30}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('AddChat', { userId: user?.uid, username: user?.displayName })}>
						<Icon 
							name="message1"
							size={30}
						/>
					</TouchableOpacity>
				</View>
			)
		})
	}, [])


	useEffect(() => {
		if(route.params){
			navigation.navigate('Chat', {...route.params})
		}
	}, [route])

	const handleSignOut = () => {
		auth.signOut()
	}

	return (
		<SafeAreaProvider>
			<View>
				<SafeSearchBar
					platform={Platform.OS === 'ios' ? 'ios' : 'android'}
					placeholder="Search For Chats"
					containerStyle={tailwind('bg-white')}
					onChangeText={(text: string) => setSearch(text)}
					value={search}
				/>
			</View>

			<ScrollView>
				<ChatList 
					navigation={navigation} 
					user={user}
					search={search}
					snapshots={snapshots}
				/>
			</ScrollView>
		</SafeAreaProvider>
	)
}

export default HomeScreen
