import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { useMarketData } from '@/hooks/useMarketData'
import { useCountUp } from '@/hooks/useCountUp'
import { Sparkline } from '@/components/charts/Sparkline'
import { fmtCOP, fmtUSD, fmtDate } from '@/utils/formatters'
import { TRM_HIST } from '@/data/constants'

export const MarketOverview: React.FC = () => {
  const { data: marketData, isLoading, error } = useMarketData()

  const trmCountUp = useCountUp(marketData?.trm || 0, !isLoading && !!marketData?.trm)
  const brentCountUp = useCountUp(marketData?.brent || 0, !isLoading && !!marketData?.brent)

  if (error) {
    return (
      <Card className="col-span-full">
        <div className="text-center py-8">
          <p className="text-brand-red">Error cargando datos de mercado</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* TRM Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="neural">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-brand-muted">TRM</h3>
              <div className="w-2 h-2 bg-brand-signal rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-brand-text">
                ${isLoading ? '---' : fmtCOP(trmCountUp)}
              </div>
              <div className="text-xs text-brand-muted">
                {marketData?.lastUpdate && fmtDate(marketData.lastUpdate)}
              </div>
            </div>

            <div className="h-16">
              <Sparkline data={TRM_HIST} color={getComputedStyle(document.documentElement).getPropertyValue('--brand-signal').trim() || '#00D4AA'} />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Brent Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="neural">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-brand-muted">Brent Oil</h3>
              <div className="w-2 h-2 bg-brand-data rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-brand-text">
                ${isLoading ? '---' : fmtUSD(brentCountUp)}
              </div>
              <div className="text-xs text-brand-muted">
                Barril · USD
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <span className="text-brand-yellow">▲</span>
              <span className="text-brand-muted">+2.3% hoy</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Importaciones Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="neural">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-brand-muted">Importaciones</h3>
              <span className="text-xs bg-brand-yellow/20 text-brand-yellow px-2 py-1 rounded-full">2025</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-brand-text">$52.3B</div>
              <div className="text-xs text-brand-muted">
                +11.7% vs 2024
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <span className="text-brand-signal">▲</span>
              <span className="text-brand-muted">Manufacturas</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Déficit Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card variant="neural">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-brand-muted">Déficit</h3>
              <span className="text-xs bg-brand-red/20 text-brand-red px-2 py-1 rounded-full">Crítico</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-brand-text">$16.4B</div>
              <div className="text-xs text-brand-muted">
                +40% import vs export
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <span className="text-brand-red">▼</span>
              <span className="text-brand-muted">30 años máximo</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
