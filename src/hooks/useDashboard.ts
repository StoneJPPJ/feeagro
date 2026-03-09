'use client'

import { useState, useEffect } from 'react'
import { mockAccount, mockPortfolio, mockChartData, mockKycStatus } from '@/lib/mock-data'
import type { Account, RWAAsset, KycStatus, ChartDataPoint } from '@/types'

interface DashboardState {
  account: Account | null
  portfolio: RWAAsset[]
  chartData: ChartDataPoint[]
  kycStatus: KycStatus | null
  loading: boolean
  error: string | null
}

export function useDashboard(): DashboardState {
  const [state, setState] = useState<DashboardState>({
    account: null,
    portfolio: [],
    chartData: [],
    kycStatus: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({
        account: mockAccount,
        portfolio: mockPortfolio,
        chartData: mockChartData,
        kycStatus: mockKycStatus,
        loading: false,
        error: null,
      })
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return state
}
