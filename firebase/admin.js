const admin = require("firebase-admin")

// const serviceAccount = require("./firebase-keys.json")

const serviceAccount = JSON.parse(process.env.FIREBASE_KEYS)
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
} catch (e) {
  console.log(e)
}

export const firestore = admin.firestore()
