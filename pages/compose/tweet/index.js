import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { getDownloadURL } from "firebase/storage"
import { addDevit, uploadImage } from "../../../firebase/client"
import { COMPOSE_STATES } from "utils/constants"
import Avatar from "components/Avatar"

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      console.log(task)
      const progress = () => {}
      const error = () => {
        console.log("Upload is running")
      }
      const complete = () => {
        console.log("complete")
        getDownloadURL(task.snapshot.ref).then(setImgURL)
      }
      task.on("state_changed", progress, error, complete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => router.push("/"))
      .catch(() => setStatus(COMPOSE_STATES.ERROR))
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    console.log(event.dataTransfer.files[0])
    const file = event.dataTransfer.files[0]
    // if (file.type.startsWith("image/")) {
    const task = uploadImage(file)
    setTask(task)
    // setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Publicar un nuevo Devit / Devter</title>
      </Head>

      <section className="form-container">
        <section className="avatar-container">
          {user && <Avatar src={user.avatar} />}
        </section>

        <form onSubmit={handleSubmit}>
          <textarea
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handleChange}
            autoFocus={true}
            placeholder="¿Qué está pasando?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} alt="uploaded" />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>

      <style jsx>{`
        form {
          padding: 10px;
        }

        textarea {
          width: 100%;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "2px dashed #09f"
            : "2px solid transparent"};
          border-radius: 10px;
          padding: 15px;
          font-size: 21px;
          resize: none;
          outline: 0;
          min-height: 200px;
        }

        button {
          top: 10px;
          right: 10px;
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          color: #fff;
          font-size: 21px;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .remove-img {
          position: relative;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        img {
          border-radius: 10px;
          width: 100%;
          height: auto;
        }

        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
