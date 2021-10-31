export const USER_STATES = Object.freeze({
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
})

export const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

export const DEFAULT_LANGUAGE = "es-ES"
