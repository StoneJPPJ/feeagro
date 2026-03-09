import type { Account, RWAAsset, Transaction, KycStatus, ChartDataPoint } from '@/types'

export const mockAccount: Account = {
  accountId: 'ACC-2026-JP-001',
  ownerName: 'João Pedro',
  currency: 'BRL',
  availableBalance: 128750.0,
}

export const mockKycStatus: KycStatus = 'approved'

export const mockPortfolio: RWAAsset[] = [
  {
    assetName: 'Soja Brasileira',
    tokenSymbol: 'SOJA24',
    quantity: 500,
    price: 142.3,
    totalValue: 71150.0,
    trend: 3.2,
    type: 'soja',
  },
  {
    assetName: 'Milho Safra 2024/25',
    tokenSymbol: 'MILHO25',
    quantity: 1200,
    price: 48.08,
    totalValue: 57690.0,
    trend: -1.8,
    type: 'milho',
  },
]

export const mockChartData: ChartDataPoint[] = [
  { month: 'Set', value: 98000 },
  { month: 'Out', value: 105200 },
  { month: 'Nov', value: 112800 },
  { month: 'Dez', value: 119500 },
  { month: 'Jan', value: 124300 },
  { month: 'Fev', value: 128840 },
]

export const mockTransactions: Transaction[] = [
  { id: 'TX001', date: '2026-02-28', description: 'PIX recebido — Cooperativa Agro Sul', type: 'IN', amount: 15000, status: 'completed' },
  { id: 'TX002', date: '2026-02-26', description: 'Compra token SOJA24', type: 'OUT', amount: 8540, status: 'completed', asset: 'SOJA24' },
  { id: 'TX003', date: '2026-02-24', description: 'Rendimento SOJA24', type: 'IN', amount: 1245.6, status: 'completed', asset: 'SOJA24' },
  { id: 'TX004', date: '2026-02-22', description: 'PIX enviado — Fornecedor Sementes', type: 'OUT', amount: 3200, status: 'completed' },
  { id: 'TX005', date: '2026-02-20', description: 'Compra token MILHO25', type: 'OUT', amount: 9614, status: 'completed', asset: 'MILHO25' },
  { id: 'TX006', date: '2026-02-18', description: 'TED recebida — Rural Capital', type: 'IN', amount: 25000, status: 'completed' },
  { id: 'TX007', date: '2026-02-15', description: 'Rendimento MILHO25', type: 'IN', amount: 892.4, status: 'completed', asset: 'MILHO25' },
  { id: 'TX008', date: '2026-02-12', description: 'PIX enviado — Energia Fazenda', type: 'OUT', amount: 1850, status: 'completed' },
  { id: 'TX009', date: '2026-02-10', description: 'Compra token SOJA24', type: 'OUT', amount: 5692, status: 'pending', asset: 'SOJA24' },
  { id: 'TX010', date: '2026-02-08', description: 'PIX recebido — Venda parcial SOJA', type: 'IN', amount: 7123, status: 'completed', asset: 'SOJA24' },
  { id: 'TX011', date: '2026-02-05', description: 'TED enviada — Armazém Central', type: 'OUT', amount: 12000, status: 'completed' },
  { id: 'TX012', date: '2026-02-03', description: 'Rendimento SOJA24', type: 'IN', amount: 1890, status: 'completed', asset: 'SOJA24' },
  { id: 'TX013', date: '2026-01-30', description: 'PIX enviado — Corretor', type: 'OUT', amount: 500, status: 'failed' },
  { id: 'TX014', date: '2026-01-28', description: 'Compra token MILHO25', type: 'OUT', amount: 4806, status: 'completed', asset: 'MILHO25' },
  { id: 'TX015', date: '2026-01-25', description: 'TED recebida — Investidor Parceiro', type: 'IN', amount: 30000, status: 'completed' },
]
