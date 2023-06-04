import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAKQy-7dSPEThflFXU6qL4-56TA4JI-8u8",
    authDomain: "event-genie-admin.firebaseapp.com",
    projectId: "event-genie-admin",
    storageBucket: "event-genie-admin.appspot.com",
    messagingSenderId: "389533008685",
    appId: "1:389533008685:web:c938f7aba57c6b18c009a4"
  };

  //initialize firebase
  firebase.initializeApp(firebaseConfig)

  //initialize different services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // timestamp
  const timestamp = firebase.firestore.Timestamp 

  export { projectFirestore , projectAuth, projectStorage, timestamp}