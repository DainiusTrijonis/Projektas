import firebase from 'firebase';
import 'firebase/firestore';

let config = {
  apiKey: "AIzaSyCeIhLGnR0aGPxiwZXSijG-iHNPMsNMWag",
  authDomain: "hmobapp-project.firebaseapp.com",
  databaseURL: "https://hmobapp-project.firebaseio.com",
  projectId: "hmobapp-project",
  storageBucket: "hmobapp-project.appspot.com",
  messagingSenderId: "275953578503",
  appId: "1:275953578503:web:84ac9dfd73431203a4f0a2",
  measurementId: "G-QXC3H308C8"
}

export const Firebase = firebase.initializeApp(config);