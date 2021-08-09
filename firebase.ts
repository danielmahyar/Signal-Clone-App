import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

let app

if(firebase.apps.length === 0) {
	app = firebase.initializeApp({
		apiKey: "AIzaSyCHlQ1n8cK8hJeqFpyQbTsmvtg6hoE8rPs",
		authDomain: "signal-clone-dbaae.firebaseapp.com",
		projectId: "signal-clone-dbaae",
		storageBucket: "signal-clone-dbaae.appspot.com",
		messagingSenderId: "195528459009",
		appId: "1:195528459009:web:97d30f7c2bf5e9b15fd100"
	})
} else {
	app = firebase.app()
}

const auth = firebase.auth()
const firestore = firebase.firestore()

export { auth, firestore }