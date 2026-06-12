import { useState, useEffect } from 'react'

const CountdownTimer = ({ targetDate }) => {
  const calculateTime = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calculateTime())

  useEffect(() => {
    const timer = setInterval(() => setTime(calculateTime()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const pad = (n) => String(n).padStart(2, '0')

  const units = [
    { label: 'Days',    value: time.days    },
    { label: 'Hours',   value: time.hours   },
    { label: 'Mins',    value: time.minutes },
    { label: 'Secs',    value: time.seconds },
  ]

  return (
    <div className="flex items-center gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div className="text-center">
            <div className="bg-white rounded-lg px-2 py-1 min-w-[36px] text-center shadow-sm">
              <span className="text-[16px] font-bold text-gray-800 font-heading tabular-nums">
                {pad(u.value)}
              </span>
            </div>
            <p className="text-[9px] text-gray-400 mt-0.5">{u.label}</p>
          </div>
          {i < units.length - 1 && (
            <span className="text-primary font-bold text-sm -mt-3">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default CountdownTimer
