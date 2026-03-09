'use client'

import { Modal, ModalFooter } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/format'
import type { OperationFormData } from '@/types'

const typeLabels: Record<OperationFormData['type'], string> = {
  pix: 'PIX',
  transfer: 'Transferência',
  invest: 'Investimento RWA',
}

interface Props {
  data: OperationFormData | null
  submitting: boolean
  onConfirm: () => void
  onBack: () => void
}

export function OperationSummary({ data, submitting, onConfirm, onBack }: Props) {
  if (!data) return null

  return (
    <Modal open title="Confirmar operação" onClose={onBack} className="max-w-sm">
      <p className="text-sm text-brand-300/40 mb-4">
        Confira os dados antes de confirmar a operação.
      </p>

      <dl className="space-y-3 text-sm">
        <Row label="Tipo">{typeLabels[data.type]}</Row>
        <Row label="Beneficiário">{data.beneficiary}</Row>
        <Row label="Valor">
          <span className="text-base font-bold text-brand-400">{formatCurrency(data.amount)}</span>
        </Row>
        {data.memo && <Row label="Descrição">{data.memo}</Row>}
      </dl>

      <ModalFooter>
        <Button variant="secondary" onClick={onBack} disabled={submitting}>
          Voltar
        </Button>
        <Button onClick={onConfirm} loading={submitting}>
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border-subtle/50 last:border-0">
      <dt className="text-brand-300/50">{label}</dt>
      <dd className="text-white/80 font-medium">{children}</dd>
    </div>
  )
}
