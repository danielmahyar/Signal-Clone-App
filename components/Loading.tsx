import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const Loading = () => {
	return (
		<View style={{ margin: 45 }}>
			<ActivityIndicator size="large" />
		</View>
	)
}

export default Loading
