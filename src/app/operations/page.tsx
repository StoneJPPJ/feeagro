'use client'

import Link from 'next/link'
import { CheckCircle, X } from 'lucide-react'
import { useOperation } from '@/hooks/useOperation'
import { OperationForm } from '@/features/operations/OperationForm'
import { OperationSummary } from '@/features/operations/OperationSummary'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function OperationsPage() {
  const { step, formData, submitting, goToSummary, confirm, reset } = useOperation()

  return (
    <div className="px-4 py-6 md:px-8 max-w-lg mx-auto">
      {/* Botão de fechar (mobile) — abaixo do logo, acima do título */}
      <div className="mb-3 md:hidden">
        <Link
          href="/dashboard"
          aria-label="Voltar para o dashboard"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border-subtle text-dim/60 hover:bg-surface-raised hover:text-white transition-colors"
        >
          <X className="size-4" />
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Nova Operação</h1>
        <p className="text-sm text-brand-300/40 mt-0.5">Simule transferências e investimentos em RWA</p>
      </div>

      {step === 'success' ? (
        <Card className="text-center py-10 space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="size-14 text-brand-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Operação enviada!</h2>
            <p className="text-sm text-brand-300/40 mt-1">
              Sua operação foi registrada e está sendo processada.
            </p>
          </div>
          <Button variant="secondary" onClick={reset} className="mx-auto">
            Nova operação
          </Button>
        </Card>
      ) : (
        <Card>
          <OperationForm onSubmit={goToSummary} />
        </Card>
      )}

      {step === 'summary' && (
        <OperationSummary
          data={formData}
          submitting={submitting}
          onConfirm={confirm}
          onBack={reset}
        />
      )}
    </div>
  )
}
