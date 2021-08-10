import React, { useEffect, useState } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

export const useAuthUser = () => {
	const [user, loading, error] = useAuthState(auth)

	if(user && user.displayName === null) {
		return { }
	}

	return { user, loading, error }
}

