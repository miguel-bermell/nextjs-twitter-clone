import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore"

import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth"

import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBJfAvra0bVCNrxmZ-9Jjqi310Fs9a7CKw",
  authDomain: "devter-bb092.firebaseapp.com",
  projectId: "devter-bb092",
  storageBucket: "devter-bb092.appspot.com",
  messagingSenderId: "857137188041",
  appId: "1:857137188041:web:9fd7d57f8e22e6445e5118",
  measurementId: "G-6H0N229N6Z",
}

const APP = initializeApp(firebaseConfig)

const db = getFirestore()

const mapUserFromFirebaseAuthToUser = (data) => {
  console.log(data)
  const { user } = data
  const { displayName, email, photoURL, uid } = user
  return {
    username: displayName,
    email,
    avatar: photoURL,
    uid,
  }
}

const authStateChanged = (onChange) => {
  const auth = getAuth()
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser({ user }) : null

    onChange(normalizedUser)
  })
}

const loginWithGithub = () => {
  const provider = new GithubAuthProvider()
  const auth = getAuth()
  setPersistence(auth, browserSessionPersistence)
  return signInWithPopup(auth, provider).then(mapUserFromFirebaseAuthToUser)
}

const addDevit = async ({ avatar, content, userId, userName, img }) => {
  try {
    const newDevit = await addDoc(collection(db, "devits"), {
      avatar,
      content,
      img,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    })
    console.log("Document written with ID: ", newDevit.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data
  const date = +createdAt.toDate()

  return {
    ...data,
    id,
    createdAt: date,
  }
}

const listenLatestDevits = (callback) => {
  const devits = query(collection(db, "devits"), orderBy("createdAt", "desc"))

  return onSnapshot(devits, ({ docs }) => {
    const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
    callback(newDevits)
  })
}

// const fetchLatestDevits = async () => {
//   const devits = collection(db, "devits")
//   return await getDocs(query(devits, orderBy("createdAt", "desc"))).then(
//     ({ docs }) => {
//       // return docs.map((doc) => {
//       //   return mapDevitFromFirebaseToDevitObject(doc)
//       // })
//       return docs.map(mapDevitFromFirebaseToDevitObject)
//     }
//   )
// }

const uploadImage = (app) => {
  console.log("[STORAGE] start")
  const storage = getStorage(APP)
  const storageRef = ref(storage, `images/${app.name}`)
  const task = uploadBytesResumable(storageRef, app, {
    metadata: {
      contentType: "image/jpeg",
    },
  })
  console.log(task)
  return task
}

export {
  loginWithGithub,
  getAnalytics,
  authStateChanged,
  addDevit,
  // fetchLatestDevits,
  uploadImage,
  listenLatestDevits,
}
