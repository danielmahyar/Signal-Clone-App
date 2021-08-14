import React from 'react'
import { View, Text } from 'react-native'
import tailwind from 'tailwind-rn'

const HeaderTitle = () => {
	return (
		<View style={tailwind('flex items-center justify-center')}>
			<Text style={tailwind('font-bold text-lg')}>Signal</Text>
		</View>
	)
}

export default HeaderTitle
