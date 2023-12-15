import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDxAoKVfL_8GIrTEnGRLWVqcp3whyuC1yc",
    authDomain: "chatapp-999b2.firebaseapp.com",
    projectId: "chatapp-999b2",
    storageBucket: "chatapp-999b2.appspot.com",
    messagingSenderId: "530185450287",
    appId: "1:530185450287:web:3ceade65a8c567fc95a7da",
    measurementId: "G-NHNE79KYFW"
})

const db = firebaseApp.firestore()

export { db }

