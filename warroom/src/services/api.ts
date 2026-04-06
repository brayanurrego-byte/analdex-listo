import axios from 'axios'
import { ApiResponse, MarketData } from '@/types'

const API_BASE = 'https://api.datos.gov.co'
const YAHOO_FINANCE = 'https://query1.finance.yahoo.com/v8/finance/chart'

export const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const marketApi = {
  async fetchTRM(): Promise<number | null> {
    try {
      const response = await api.get(
        `${API_BASE}/resource/mcec-87by.json?$order=vigenciadesde%20DESC&$limit=1`,
        { timeout: 7000 }
      )
      const data = response.data
      return data?.[0]?.valor ? parseFloat(data[0].valor) : null
    } catch (error) {
      console.error('Error fetching TRM:', error)
      return null
    }
  },

  async fetchBrent(): Promise<number | null> {
    try {
      const url = `${YAHOO_FINANCE}/BZ=F?interval=1d&range=3d`
      const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      
      const response = await api.get(proxy, { timeout: 9000 })
      const parsed = JSON.parse(response.data.contents)
      
      return parsed?.chart?.result?.[0]?.meta?.regularMarketPrice ?? null
    } catch (error) {
      console.error('Error fetching Brent:', error)
      return null
    }
  },

  async fetchMarketData(): Promise<MarketData> {
    const [trm, brent] = await Promise.all([
      this.fetchTRM(),
      this.fetchBrent(),
    ])

    return {
      trm,
      brent,
      lastUpdate: new Date(),
    }
  },
}

export const createApiResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  success: true,
  timestamp: new Date(),
})

export const createApiError = <T>(error: string): ApiResponse<T> => ({
  data: null as T,
  success: false,
  error,
  timestamp: new Date(),
})
