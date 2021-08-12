import React, { useContext } from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { View } from 'react-native';
import { firestore } from '../firebase';
import useAuthRedux from '../auth/auth-redux';
import { AuthContext } from '../auth/auth-context';

const AddUserToChat = () => {
	const { user } = useContext(AuthContext)
	const query = firestore.collection('users').where('friends', 'array-contains', user?.uid)
	const [values, loading, error] = useCollectionDataOnce(query)
	console.log(values)
	return (
		<View>
			
		</View>
	);
}

export default AddUserToChat;
