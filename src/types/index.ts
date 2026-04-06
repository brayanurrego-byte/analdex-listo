export interface Session {
  id: number
  time: string
  label: string
  accent: string
  speaker: string
  org: string
  photo: string | null
  initials: string
}

export interface TRMData {
  m: string
  v: number
}

export interface TimelineEvent {
  year: string
  title: string
  desc: string
  type: 'reforma' | 'tlc' | 'mod' | 'tech' | 'politica' | 'sancion' | 'futuro'
}

export interface SancionComparison {
  asp: string
  col: string
  chi: string
  mex: string
  w: 'col' | 'chi' | 'mex' | 'tie'
}

export interface ProyectoLey {
  cod: string
  titulo: string
  estado: string
  impacto: string
  alerta: boolean
  comision: string
}

export interface MarketData {
  trm: number | null
  brent: number | null
  lastUpdate: Date
}

export interface NeuralNode {
  x: number
  y: number
  vx: number
  vy: number
}

export interface ChartData {
  value: number
  label: string
  timestamp: Date
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
  timestamp: Date
}
