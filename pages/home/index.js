import Head from "next/head"
import Devit from "components/Devit"
import { listenLatestDevits } from "../../firebase/client"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import Link from "next/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { colors } from "styles/theme"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe = null
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ id, userName, avatar, img, content, userId, createdAt }) => {
            return (
              <Devit
                avatar={avatar}
                createdAt={createdAt}
                id={id}
                img={img}
                key={id}
                content={content}
                userName={userName}
                userId={userId}
              />
            )
          }
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        header {
          height: 49px;
          position: sticky;
          top: 0;
          border-bottom: 1px solid #ccc;
          width: 100%;
          padding: 0 16px;
          display: flex;
          align-items: center;
          background: #ffffffee;
          backdrop-filter: blur(5px);
        }

        section {
          flex: 1;
        }

        h2 {
          margin: 0;
          padding: 0;
          font-size: 20px;
          line-height: 49px;
          color: #333;
        }

        nav {
          display: flex;
          position: sticky;
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          width: 100%;
          background: #ffffff;
        }

        nav a {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          flex: 1 1 auto;
          transition: all 0.3s ease-in-out;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 15%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
