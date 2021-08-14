import { auth, firestore } from "../firebase"

type ProfileData = {
	photoURL: string
	displayName: string
}

export const registerUser = async (email: string, password: string, profileData: ProfileData) => {
	const newUser = await auth.createUserWithEmailAndPassword(email, password)
	await newUser?.user?.updateProfile(profileData)
	await firestore.collection('users').doc(newUser.user?.uid).set({ ...profileData, friends: [] })

}

export const login = async (email: string, password: string) => { await auth.signInWithEmailAndPassword(email, password) }

export const logOut = async () => { auth.signOut() }