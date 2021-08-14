import React from 'react'
import { View, Platform } from 'react-native'
import tailwind from 'tailwind-rn';
import { SearchBar } from 'react-native-elements'
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';


// Using SearchBarBaseProps instead of SearchBarDefaultProps & SearchBarAndroidProps & SearchBarIOSProps
const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;

const SearchBarComp = ({ search, setSearch }: any) => {
	return (
		<View style={tailwind('border-b border-gray-200')}>
			<SafeSearchBar
				platform={Platform.OS === 'ios' ? 'ios' : 'android'}
				placeholder="Search For Chats"
				containerStyle={tailwind('bg-white')}
				onChangeText={(text: string) => setSearch(text)}
				value={search}
			/>
		</View>
	)
}

export default SearchBarComp
