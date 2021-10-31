import Devit from "components/Devit"
import { useRouter } from "next/router"
import { firestore } from "../../firebase/admin"

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  console.log(props)
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "5EmotMpchOIeZbfzC4d2" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  console.log(id)

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// export async function getServerSideProps(context) {
//   const { params, res } = context
//   const { id } = params

//   console.log(id)

//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props }
//   }
//   if (res) {
//     res.writeHead(301, { Location: "/home" }).end()
//   }
// }

// DevitPage.getInitialProps = (context) => {
//   const { query, res } = context
//   const { id } = query

//   console.log(id)

//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) return apiResponse.json()
//     if (res) {
//       res.writeHead(301, { Location: "/home" }).end()
//     }
//   })
// }
