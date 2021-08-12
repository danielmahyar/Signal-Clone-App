import React, { useReducer, useEffect, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

export const REDUCER_ACTIONS = {
	SIGN_IN: 'signin',
	SIGN_OUT: 'signout',
	CURRENT_USER_EXITS: 'currentUser'
}

const initialUserState = {
	loading: true,
	isSignedOut: true,
}

const reducer = (prevState: any, action: any) => {
	switch (action.type) {
	  case REDUCER_ACTIONS.SIGN_IN:
	    return {
		 ...prevState,
		 isSignedOut: false,
	    }
   
	  case REDUCER_ACTIONS.SIGN_OUT:
	    return {
		 ...prevState,
		 isSignedOut: true,
	    }
   
	  case REDUCER_ACTIONS.CURRENT_USER_EXITS:
	    return {
		 ...prevState,
		 isSignedOut: false,
		 loading: false
	    }
	    
	  default: 
	    throw new Error()
	}
}



const useAuthRedux = () => {
	const [user, loading, error] = useAuthState(auth)
	const [userState, dispatchUser] = useReducer(reducer, initialUserState)

	useEffect(() => {

		// ! NORMALLY THIS SECTION WILL BE ASYNC
		// ! IN THAT CASE WRAP THIS PART IN A FUNCTION CALLED ASYNC

		if (user) { dispatchUser({ type: REDUCER_ACTIONS.CURRENT_USER_EXITS }) }
	}, [user])

	return { user, userState, dispatchUser, loading, error }
}




export default useAuthRedux