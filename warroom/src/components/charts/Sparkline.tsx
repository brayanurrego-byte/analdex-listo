import React from 'react'
import { motion } from 'framer-motion'
import { TRMData } from '@/types'

interface SparklineProps {
  data: TRMData[]
  color?: string
  height?: number
  width?: number
}

export const Sparkline: React.FC<SparklineProps> = ({ 
  data, 
  color = '#00D4AA', 
  height = 70, 
  width = 320 
}) => {
  const values = data.map(d => d.v)
  const min = Math.min(...values) - 80
  const max = Math.max(...values) + 80

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width
    const y = height - ((value - min) / (max - min)) * height
    return [x, y]
  })

  const pathData = `M ${points.map(p => p.join(',')).join(' L ')}`
  const areaData = `M ${points[0].join(',')} L ${points.map(p => p.join(',')).join(' L ')} L ${width},${height} L 0,${height} Z`
  const lastPoint = points[points.length - 1]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        style={{ width: '100%', height }} 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <motion.path
          d={areaData}
          fill={`url(#gradient-${color.replace('#', '')})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        <motion.circle
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          r="4"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        />
        
        <motion.circle
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          r="8"
          fill={color}
          fillOpacity="0.2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
      </svg>
    </motion.div>
  )
}
