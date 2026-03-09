import { ShieldCheck, ShieldAlert, Clock, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CardSkeleton } from '@/components/ui/Skeleton'
import type { KycStatus } from '@/types'

const statusConfig = {
  approved: {
    icon:        ShieldCheck,
    label:       'Verificado',
    variant:     'success' as const,
    description: 'Identidade verificada com sucesso.',
    iconColor:   'text-brand-400',
    iconBg:      'bg-brand-600/15',
  },
  pending: {
    icon:        Clock,
    label:       'Em análise',
    variant:     'warning' as const,
    description: 'Documentos em análise. Prazo: 2 dias úteis.',
    iconColor:   'text-gold-400',
    iconBg:      'bg-gold-400/10',
  },
  rejected: {
    icon:        ShieldAlert,
    label:       'Rejeitado',
    variant:     'error' as const,
    description: 'Verificação falhou. Reenvie os documentos.',
    iconColor:   'text-red-400',
    iconBg:      'bg-red-500/10',
  },
}

interface Props {
  status: KycStatus | null
  loading: boolean
}

export function KycStatusCard({ status, loading }: Props) {
  if (loading) return <CardSkeleton />

  const config = statusConfig[status ?? 'pending']
  const Icon   = config.icon

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status KYC</CardTitle>
        {/* Spec: w-8 h-8 rounded-full bg-accent-teal/30 text-accent-green */}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full hover:scale-105 transition-transform"
          style={{ background: 'var(--btn-action-bg)', border: '1px solid var(--btn-action-border)' }}
          aria-label="Saiba mais sobre KYC"
        >
          <ArrowUpRight className="size-3.5 text-accent-green" />
        </button>
      </CardHeader>

      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl shrink-0 ${config.iconBg}`}>
          <Icon className={`size-5 ${config.iconColor}`} />
        </div>
        <div>
          <Badge variant={config.variant}>{config.label}</Badge>
          <p className="text-xs text-dim/70 mt-1.5">{config.description}</p>
        </div>
      </div>
    </Card>
  )
}
