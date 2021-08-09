import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'tailwind-rn'

const LoadingScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={tailwind('items-center p-10')}>
				<ActivityIndicator size="large" />
			</View>
		</SafeAreaView>
	)
}

export default LoadingScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: 'white'
	}
})