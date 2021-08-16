import React, { useContext } from 'react';
import { useCollection, useCollectionDataOnce, useCollectionOnce } from 'react-firebase-hooks/firestore';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { firestore } from '../firebase';
import firebase from 'firebase'
import { AuthContext } from '../auth/auth-context';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { addUserToChat } from '../database/firestore-query';

const AddUserToChat = ({ navigation, route }: any ) => {
	const { user } = useContext(AuthContext)
	const query = firestore.collection('users').where(firebase.firestore.FieldPath.documentId(), '!=', user?.uid).limit(10)
	const [snapshots, loading, error] = useCollectionOnce(query)
	const filteredSnapshots = snapshots?.docs.filter(s => !route.params.chatPeople.includes(s.id))

	const handleUserAdd = async (uid: string) => {
		try {
			await addUserToChat(uid, route.params.chatId)
			navigation.pop(3)
		} catch (error) {
			console.log(error)
		}

	}

	return (
		<ScrollView>
			{filteredSnapshots?.map((snapshot) => (
				<TouchableOpacity key={snapshot.id} onPress={() => handleUserAdd(snapshot.id)}>
					<ListItem bottomDivider>
						<Avatar 
							rounded
							source={{
								uri: snapshot.data().photoURL
							}}
						/>

						<ListItem.Content>
							<ListItem.Title>{snapshot.data().displayName}</ListItem.Title>
						</ListItem.Content>
					</ListItem>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
}

export default AddUserToChat;
