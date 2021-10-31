import css from "styled-jsx/css"

import { colors, fonts, breakpoints } from "../../styles/theme"
import { addOpacityToColor } from "../../styles/utils"

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background-image: radial-gradient(${backgroundColor}, 1px, transparent 1px),
      radial-gradient(${backgroundColor}, 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    overflow: hidden;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
