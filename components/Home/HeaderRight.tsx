import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/AntDesign'
import tailwind from 'tailwind-rn';

const HeaderRight = ({ user }: any) => {
	const navigation = useNavigation()
	return (
		<View style={tailwind('flex flex-row items-center justify-between w-full mr-5')}>
			<TouchableOpacity>
				<Icon 
					name='camerao'
					size={30}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('AddChat', { userId: user?.uid, username: user?.displayName })}>
				<Icon 
					name="plus"
					size={30}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default HeaderRight

