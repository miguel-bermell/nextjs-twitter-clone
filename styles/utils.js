export const addOpacityToColor = (color, opacity) => {
  const opacityHex = Math.round(opacity * 255).toString(16)
  return `${color}${opacityHex}`
}

export const USER_STATES = Object.freeze({
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
})
