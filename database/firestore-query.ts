import { firestore } from "../firebase"
import firebase from 'firebase'

export const getUserInfo = async (uid: string) => {
	const userInfo = await firestore.collection('users').doc(uid).get()
	return userInfo.data()
}

export const addUserToChat = async (newUserUid: string, chatId: string) => {
	const ref = firestore.collection('chats').doc(chatId)
	await ref.update({
		people: firebase.firestore.FieldValue.arrayUnion(newUserUid)
	})
}

export const deleteChat = async (uid: string) => {
	const ref = firestore.collection('chats').doc(uid)
	await ref.delete()
}