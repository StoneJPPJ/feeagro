'use client'

import { useState } from 'react'
import { useForm, Controller, type Resolver, type FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import type { OperationFormData } from '@/types'

const schema = z.object({
  type: z.enum(['pix', 'transfer', 'invest']),
  beneficiary: z.string().min(3, 'Informe o beneficiário (mín. 3 caracteres)'),
  amount: z.preprocess(
    (value) => {
      // Permite campo vazio antes da validação (mostra erro "informe o valor")
      if (value === '' || value === null || typeof value === 'undefined') return undefined
      const num = Number(value)
      return Number.isNaN(num) ? undefined : num
    },
    z
      .number()
      .min(0.01, 'Valor deve ser maior que zero')
      .max(500000, 'Limite máximo de R$ 500.000')
      .refine((val) => typeof val === 'number' && !Number.isNaN(val), {
        message: 'Informe um valor numérico válido',
      }),
  ),
  memo: z.string().max(100, 'Máximo 100 caracteres').optional(),
})

type FormValues = z.infer<typeof schema>

const typeLabels: Record<FormValues['type'], string> = {
  pix:      'PIX',
  transfer: 'Transferência',
  invest:   'Investimento RWA',
}

interface Props {
  onSubmit: (data: OperationFormData) => void
}

/* ── Currency formatter ───────────────────────────────────────────────────────
   Converts raw user input into a pt-BR formatted string AND a numeric value.

   Rules:
     • Keep only digits and one comma (decimal separator in pt-BR)
     • Dots (thousand separators) are stripped before processing
     • Up to 2 decimal digits after the comma
     • Returns display string e.g. "200.000,00" and numeric 200000.00
──────────────────────────────────────────────────────────────────────────── */
function parseCurrencyInput(input: string): { display: string; numeric: number | undefined } {
  // Strip thousand-separator dots then keep only digits and one comma
  const cleaned = input.replace(/\./g, '').replace(/[^\d,]/g, '')

  if (!cleaned) return { display: '', numeric: undefined }

  const [intStr = '', decStr] = cleaned.split(',')
  const intNum = parseInt(intStr, 10) || 0

  // Format integer part with pt-BR thousand separators
  const intFormatted = intNum.toLocaleString('pt-BR')

  // Build display: if user already typed a comma, keep decimal portion
  const display = decStr !== undefined
    ? `${intFormatted},${decStr.slice(0, 2)}`
    : intFormatted

  const numeric = parseFloat(`${intStr || '0'}.${decStr ?? '00'}`)

  return { display, numeric }
}

export function OperationForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { type: 'pix' },
  })

  /* Local display state for the formatted amount field */
  const [amountDisplay, setAmountDisplay] = useState('')

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

      {/* ── Type ── */}
      <div>
        <label className="block text-xs font-medium text-brand-300/60 uppercase tracking-widest mb-2">
          Tipo de operação
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(typeLabels) as FormValues['type'][]).map((type) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" value={type} {...register('type')} className="sr-only peer" />
              <div className="text-center py-2.5 px-3 rounded-xl border border-border-subtle
                text-sm font-medium text-brand-300/50
                peer-checked:border-accent-green/40 peer-checked:bg-accent-green/10 peer-checked:text-accent-green
                hover:border-white/10 hover:text-white/70 transition-colors">
                {typeLabels[type]}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ── Beneficiary ── */}
      <div>
        <label htmlFor="beneficiary" className="block text-xs font-medium text-brand-300/60 uppercase tracking-widest mb-2">
          Beneficiário / Chave PIX
        </label>
        <input
          id="beneficiary"
          type="text"
          placeholder="Nome, CPF, e-mail ou chave PIX"
          {...register('beneficiary')}
          className="w-full px-3 py-2 text-sm bg-surface-raised text-white placeholder:text-brand-300/30
            border border-border-subtle rounded-xl
            focus:outline-none focus:ring-2 focus:ring-accent-green/40 focus:border-transparent
            aria-invalid:border-red-500/60"
          aria-invalid={!!errors.beneficiary}
          aria-describedby={errors.beneficiary ? 'beneficiary-error' : undefined}
        />
        {errors.beneficiary && (
          <p id="beneficiary-error" role="alert" className="mt-1 text-xs text-red-400">
            {errors.beneficiary.message}
          </p>
        )}
      </div>

      {/* ── Amount — formatted text input (no spinner arrows) ── */}
      <div>
        <label htmlFor="amount" className="block text-xs font-medium text-brand-300/60 uppercase tracking-widest mb-2">
          Valor (R$)
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <div className="relative">
              {/* Prefix */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-brand-300/40 font-medium select-none">
                R$
              </span>

              <input
                id="amount"
                ref={field.ref}
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={amountDisplay}
                onBlur={field.onBlur}
                onChange={(e) => {
                  const { display, numeric } = parseCurrencyInput(e.target.value)
                  setAmountDisplay(display)
                  field.onChange(typeof numeric === 'number' ? numeric : '')
                }}
                className="w-full pl-9 pr-4 py-2 text-sm bg-surface-raised text-white placeholder:text-brand-300/30
                  border border-border-subtle rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-accent-green/40 focus:border-transparent
                  aria-invalid:border-red-500/60"
                aria-invalid={!!errors.amount}
                aria-describedby={errors.amount ? 'amount-error' : undefined}
              />
            </div>
          )}
        />
        {errors.amount && (
          <p id="amount-error" role="alert" className="mt-1 text-xs text-red-400">
            {getAmountErrorMessage(errors.amount)}
          </p>
        )}
      </div>

      {/* ── Memo ── */}
      <div>
        <label htmlFor="memo" className="block text-xs font-medium text-brand-300/60 uppercase tracking-widest mb-2">
          Descrição{' '}
          <span className="text-brand-300/30 font-normal normal-case">(opcional)</span>
        </label>
        <input
          id="memo"
          type="text"
          placeholder="Ex: Pagamento safra 2026"
          {...register('memo')}
          className="w-full px-3 py-2 text-sm bg-surface-raised text-white placeholder:text-brand-300/30
            border border-border-subtle rounded-xl
            focus:outline-none focus:ring-2 focus:ring-accent-green/40 focus:border-transparent"
        />
        {errors.memo && (
          <p role="alert" className="mt-1 text-xs text-red-400">{errors.memo.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg">
        Revisar operação
      </Button>
    </form>
  )
}

function getAmountErrorMessage(error: FieldError): string {
  const msg = error.message ?? ''
  const normalized = msg.toLowerCase()

  if (!msg || normalized.includes('invalid input') || normalized.includes('expected number')) {
    return 'Informe o valor da operação'
  }

  return msg
}
