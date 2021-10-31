/* eslint-disable react/jsx-no-undef */
import Avatar from "components/Avatar"
import { colors } from "styles/theme"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"
import useDateTimeFormat from "hooks/useDateTimeFormat"

export default function Devit({
  createdAt,
  avatar,
  userName,
  content,
  img,
  id,
}) {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated} className="date">
                  {timeAgo}
                </time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          padding: 10px 15px;
          display: flex;
          border-bottom: 1px solid ${colors.border};
        }

        article:hover {
          background: ${colors.border};
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-top: 10px;
        }

        .date {
          color: ${colors.date};
          white-space: nowrap;
          font-size: 14px;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }
      `}</style>
    </>
  )
}
