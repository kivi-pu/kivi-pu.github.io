import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyAP3J-XdlTdcxSNxWqq-s_oFjDrKRQiZWo',
  authDomain: 'kivi-pu.firebaseapp.com',
  projectId: 'kivi-pu',
  storageBucket: 'kivi-pu.appspot.com',
  messagingSenderId: '548489968120',
  appId: '1:548489968120:web:26993108b29017326bbe0d'
})

export const auth = firebase.auth()

export const firestore = firebase.firestore()
