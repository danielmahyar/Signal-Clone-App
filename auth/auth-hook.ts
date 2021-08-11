import React from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

type NewUser = {
	username?: string;
	photoURL?: string;
}

export const useAuthUser = () => {
	const [user, loading, error] = useAuthState(auth)


	return { user, loading, error }
}

