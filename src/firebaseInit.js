import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
export var storage = firebase.storage();