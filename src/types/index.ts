export interface Account {
  accountId: string
  ownerName: string
  currency: string
  availableBalance: number
}

export type AssetType = 'soja' | 'milho'

export interface RWAAsset {
  assetName: string
  tokenSymbol: string
  quantity: number
  price: number
  totalValue: number
  trend: number
  type: AssetType
}

export type TransactionType = 'IN' | 'OUT'
export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface Transaction {
  id: string
  date: string
  description: string
  type: TransactionType
  amount: number
  status: TransactionStatus
  asset?: string
}

export type KycStatus = 'approved' | 'pending' | 'rejected'

export type OperationType = 'pix' | 'transfer' | 'invest'

export interface OperationFormData {
  type: OperationType
  beneficiary: string
  amount: number
  memo?: string
}

export interface ChartDataPoint {
  month: string
  value: number
}
