import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Platform, ScrollView, TouchableOpacity, View, Text } from "react-native"
import { SearchBar } from 'react-native-elements'
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';
import Icon  from '@expo/vector-icons/AntDesign'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import tailwind from 'tailwind-rn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatList from '../components/ChatList';
import { AuthContext } from '../auth/auth-context';
import { firestore } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';


//// IMPLENT OWN REDUCER FUNCTION TO MANAGE USER STATE
//// TO SEE THE REFERENCE. https://reactnavigation.org/docs/auth-flow/
//// TL;DR: MAKE REDUCER FUNCTION WHICH MANAGAES SIGNIN, SIGNUP AND LOADING

// Using SearchBarBaseProps instead of SearchBarDefaultProps & SearchBarAndroidProps & SearchBarIOSProps
const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;

const HomeScreen = ({ navigation, route }: any) => {
	const { signOut, user }: any = useContext(AuthContext)
	const [search, setSearch] = useState<string>("")
	const firestoreQuery = (user) ? firestore.collection('chats').where('people', 'array-contains', user?.uid) : null
	const [snapshots, loadingFirestore, error ] = useCollection(firestoreQuery)

	useLayoutEffect(() => {
		navigation.setOptions({
			title: user?.displayName,
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
								uri: user?.photoURL
							}}
						/>
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View style={tailwind('flex flex-row items-center justify-between w-full mr-5')}>
					<TouchableOpacity>
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

	}, [user])

	useEffect(() => {
		if(route.params){
			navigation.navigate('Chat', {...route.params})
		}
	}, [route])

	const handleSignOut = () => {
		signOut()
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
				{user && !loadingFirestore && (
					<ChatList 
						user={user}
						search={search}
						snapshots={snapshots}
					/>			
				)}
		
			</ScrollView>
		</SafeAreaProvider>
	)
}

export default HomeScreen
