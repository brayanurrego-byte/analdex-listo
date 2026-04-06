import { useState, useEffect } from 'react'

export const useCountUp = (target: number, active: boolean, duration = 1800) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    setValue(0)
    let raf: number

    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out quartic)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentValue = Math.floor(easeOutQuart * target)
      setValue(currentValue)

      if (progress < 1) {
        raf = requestAnimationFrame(animate)
      } else {
        setValue(target)
      }
    }

    raf = requestAnimationFrame(animate)

    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target, active, duration])

  return value
}
