import { useEffect, useState } from 'react'

/**
 * Custom hook to count down the time left until the date has passed
 * @param date
 * @returns seconds left until the date
 */
export function useCountDown(date: Date): number | null {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    function calculateTimeLeft(): number {
      return Math.max(
        0,
        Math.floor((date.getTime() - new Date().getTime()) / 1000),
      )
    }
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return (): void => clearInterval(timer)
  }, [date])

  return timeLeft
}
