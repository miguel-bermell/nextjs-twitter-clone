import { firestore } from "../../../firebase/admin"

export default (req, res) => {
  const { id } = req.query

  firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).end()
      }

      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      const date = +createdAt.toDate()
      res.json({
        ...data,
        id,
        createdAt: date,
      })
    })
}
