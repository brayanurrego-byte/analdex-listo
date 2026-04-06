import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { NeuralNode } from '@/types'

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NeuralNode[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    // Initialize nodes
    nodesRef.current = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))

    let animationId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodesRef.current.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      })

      // Draw connections
      nodesRef.current.forEach((nodeA, i) => {
        nodesRef.current.slice(i + 1).forEach(nodeB => {
          const distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y)
          if (distance < 170) {
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.09 * (1 - distance / 170)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodesRef.current.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 212, 170, 0.22)'
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
