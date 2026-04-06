import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { MarketData, Session, TimelineEvent, ProyectoLey } from '@/types'

interface AppState {
  // Market data
  marketData: MarketData | null
  isLoadingMarket: boolean
  marketError: string | null
  
  // UI state
  selectedSession: Session | null
  selectedTimelineEvent: TimelineEvent | null
  activeSection: string
  
  // Preferences
  theme: 'dark' | 'light'
  autoRefresh: boolean
  refreshInterval: number
  
  // Actions
  setMarketData: (data: MarketData) => void
  setLoadingMarket: (loading: boolean) => void
  setMarketError: (error: string | null) => void
  setSelectedSession: (session: Session | null) => void
  setSelectedTimelineEvent: (event: TimelineEvent | null) => void
  setActiveSection: (section: string) => void
  setTheme: (theme: 'dark' | 'light') => void
  setAutoRefresh: (autoRefresh: boolean) => void
  setRefreshInterval: (interval: number) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      marketData: null,
      isLoadingMarket: false,
      marketError: null,
      selectedSession: null,
      selectedTimelineEvent: null,
      activeSection: 'dashboard',
      theme: 'dark',
      autoRefresh: true,
      refreshInterval: 30000, // 30 seconds
      
      // Actions
      setMarketData: (data) => set({ marketData: data }),
      setLoadingMarket: (loading) => set({ isLoadingMarket: loading }),
      setMarketError: (error) => set({ marketError: error }),
      setSelectedSession: (session) => set({ selectedSession: session }),
      setSelectedTimelineEvent: (event) => set({ selectedTimelineEvent: event }),
      setActiveSection: (section) => set({ activeSection: section }),
      setTheme: (theme) => set({ theme }),
      setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
      setRefreshInterval: (interval) => set({ refreshInterval: interval }),
    }),
    {
      name: 'warroom-store',
    }
  )
)
