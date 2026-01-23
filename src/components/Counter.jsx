import React, { useEffect, useState } from 'react'

export default function Counter({ to = 0, suffix = '', duration = 1200 }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = null
    const from = 0
    const diff = to - from
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setValue(Math.floor(from + diff * progress))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [to, duration])
  return (
    <div className="counter">
      {value}
      {suffix && <span className="counter-suffix">{suffix}</span>}
    </div>
  )
}
