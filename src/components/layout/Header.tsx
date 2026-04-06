import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'

export const Header: React.FC = () => {
  const { activeSection, setActiveSection } = useAppStore()

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
    { id: 'sessions', label: 'Sesiones', icon: '🎯' },
    { id: 'projects', label: 'Proyectos', icon: '🏛️' },
    { id: 'compare', label: 'Comparar', icon: '🌎' },
  ]

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-brand-void/80 backdrop-blur-lg border-b border-brand-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-signal rounded-lg flex items-center justify-center">
                <span className="text-brand-void font-bold text-sm">WR</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-brand-text">War Room</h1>
                <p className="text-xs text-brand-muted">XVI Foro Importadores</p>
              </div>
            </div>
          </motion.div>

          <motion.nav 
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className="flex items-center space-x-2"
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </Button>
            ))}
          </motion.nav>

          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-brand-signal rounded-full animate-pulse"></div>
              <span className="text-brand-muted">Live</span>
            </div>
            <Button variant="outline" size="sm">
              Exportar
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
