import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from "react-native"
import SearchBar from '../components/SearchBarComp'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatList from '../components/ChatList';
import { AuthContext } from '../auth/auth-context';
import { firestore } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import HeaderLeft from '../components/Home/HeaderLeft';
import HeaderRight from '../components/Home/HeaderRight';
import HeaderTitle from '../components/Home/HeaderTitle';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation, route }: any) => {
	const { user, loading, error } = useContext(AuthContext);

	const [search, setSearch] = useState<string>("")

	const firestoreQuery = user ? firestore.collection('chats').where('people', 'array-contains', user?.uid) : null
	const [snapshots, loadingFirestore, firestoreError] = useCollection(firestoreQuery)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => <HeaderTitle />,
			headerLeft: () => <HeaderLeft handlePress={handlePress} uri={user?.photoURL}/>,
			headerRight: () => <HeaderRight user={user}/>,
			headerStyle: {
				backgroundColor: 'transparent'
			},
		})
	}, [user])

	useEffect(() => {
		if(route.params){
			navigation.navigate('Chat', {...route.params})
		}
	}, [route])

	const handlePress = () => {
		navigation.navigate('Profile', { uid: user.uid })
	}

	return (
		<SafeAreaProvider style={{ backgroundColor: 'white' }}>
			<StatusBar style="dark"/>
			<SearchBar 
				search={search}
				setSearch={setSearch}
			/>

			<ScrollView>

				{!snapshots && loadingFirestore && (
					<Loading />
				)}

				{snapshots && !loadingFirestore && (
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
