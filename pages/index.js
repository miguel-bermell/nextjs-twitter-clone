import Head from "next/head"
import Button from "components/Button"
import Github from "components/Icons/github"
import { USER_STATES } from "utils/constants"
import { colors } from "styles/theme"
import { useRouter } from "next/dist/client/router"

import { loginWithGithub } from "../firebase/client"
import { useEffect } from "react"
import useUser from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleLogin = () => {
    loginWithGithub()
      .then(user)
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <img src="/devter-logo.png" alt="Logo" />
        <h1>Devter</h1>
        <h2>
          Talk about development <br /> with developers👩‍🎓👩‍🏫
        </h2>
        <div className="btn">
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleLogin}>
              <Github fill={colors.white} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        div {
          color: ${colors.primary};
        }

        span {
          color: red;
        }

        .btn {
          margin-top: 15px;
          color: ${colors.white};
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        img {
          width: 120px;
        }

        h1 {
          color: ${colors.primary};
          font-weight: bold;
          margin-bottom: 15px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 18px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
