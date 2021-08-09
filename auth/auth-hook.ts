import React, { useEffect } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

export const useAuthUser = () => {
	const [user, loading, error] = useAuthState(auth)

	return { user, loading, error }
}

