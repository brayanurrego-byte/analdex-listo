import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'glass' | 'neural'
  padding?: 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl border transition-all duration-300'
    
    const variants = {
      default: 'bg-brand-card border-brand-border hover:border-brand-border2',
      glass: 'bg-brand-card/50 backdrop-blur-md border-brand-border/50 hover:bg-brand-card/70',
      neural: 'bg-gradient-to-br from-brand-card to-brand-deep border-brand-signal/20 hover:border-brand-signal/40',
    }

    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <motion.div
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
