import React from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { View } from 'react-native';
import { firestore } from '../firebase';
import { useAuthUser } from '../auth/auth-hook'

const AddUserToChat = () => {
	const { user } = useAuthUser()
	const query = firestore.collection('users').where('friends', 'array-contains', user?.uid)
	const [values, loading, error] = useCollectionDataOnce(query)
	console.log(values)
	return (
		<View>
			
		</View>
	);
}

export default AddUserToChat;
