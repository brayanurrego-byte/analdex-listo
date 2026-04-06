export const fmtCOP = (n: number): string => 
  Math.round(n).toLocaleString('es-CO')

export const fmtUSD = (n: number): string => 
  parseFloat(n.toString()).toLocaleString('en-US', { maximumFractionDigits: 2 })

export const fmtPercent = (n: number): string => 
  `${(n * 100).toFixed(1)}%`

export const fmtDate = (date: Date): string => 
  new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)

export const fmtCompact = (n: number): string => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toString()
}
