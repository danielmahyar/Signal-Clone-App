import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import tailwind from 'tailwind-rn';

const HeaderLeft = ({ handleSignOut, uri }: any) => {
	return (
		<View style={tailwind('flex justify-center items-center ml-5')}>
			<TouchableOpacity onPress={handleSignOut}>
				<Avatar
					titleStyle={tailwind('font-bold')}
					rounded
					size={35}
					source={{
						uri
					}}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default HeaderLeft
