import React, { useContext } from 'react';
import { useCollection, useCollectionDataOnce, useCollectionOnce } from 'react-firebase-hooks/firestore';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { firestore } from '../firebase';
import { AuthContext } from '../auth/auth-context';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

const AddUserToChat = () => {
	const { user } = useContext(AuthContext)
	const query = firestore.collection('users').where('friends', 'array-contains', user?.uid)
	const [snapshots, loading, error] = useCollectionOnce(query)
	return (
		<ScrollView>
			{snapshots?.docs.map((snapshot) => (
				<TouchableOpacity key={snapshot.id}>
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
