import { useQuery } from '@tanstack/react-query'
import { marketApi } from '@/services/api'
import { MarketData } from '@/types'
import { useAppStore } from '@/store/useAppStore'

export const useMarketData = () => {
  const { setMarketData, setLoadingMarket, setMarketError } = useAppStore()

  return useQuery<MarketData>({
    queryKey: ['marketData'],
    queryFn: marketApi.fetchMarketData,
    refetchInterval: 30000, // 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: (data) => {
      setMarketData(data)
      setLoadingMarket(false)
      setMarketError(null)
    },
    onError: (error) => {
      setMarketError(error instanceof Error ? error.message : 'Error fetching market data')
      setLoadingMarket(false)
    },
    onSettled: () => {
      setLoadingMarket(false)
    },
  })
}
