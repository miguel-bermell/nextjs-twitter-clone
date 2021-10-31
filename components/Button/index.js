import { colors } from "../../styles/theme"

export default function Button({ children, disabled, onClick }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          display: flex;
          background-color: ${colors.black};
          border: 0;
          color: ${colors.white};
          border-radius: 9999px;
          font-weight: bold;
          padding: 10px 28px;
          font-size: 15px;
          cursor: pointer;
          box-shadow: rgb(0 0 0 / 8%) 0px 8px 28px;
          transition-property: opacity, box-shadow;
          transition-duration: 0.2s;
          transition-timing-function: ease-in-out;
          user-select: none;
        }

        button > :global(svg) {
          margin-right: 10px;
        }

        button[disabled] {
          pointer-events: none;
          cursor: not-allowed;
          opacity: 0.2;
        }

        button:hover {
          opacity: 0.8;
          box-shadow: rgb(0 0 0 / 10%) 0px 8px 28px;
        }
      `}</style>
    </>
  )
}
