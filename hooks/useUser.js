import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { USER_STATES } from "utils/constants"
import { authStateChanged } from "../firebase/client"

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  useEffect(() => {
    authStateChanged(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}
