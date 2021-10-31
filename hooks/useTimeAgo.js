import { useEffect, useState } from "react"
import { DATE_UNITS } from "utils/constants"

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsUnit || unit === "second") {
      const value = Math.round(elapsed / secondsUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  const intervalTime = {
    second: 5000,
    minute: 50000,
    hour: 3480000,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      console.log(timeago, timeago.unit)
      setTimeago(newTimeAgo)
    }, intervalTime[timeago.unit] || intervalTime.hour)

    return () => clearInterval(interval)
  }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  })

  const { value, unit } = timeago

  return rtf.format(value, unit)
}
