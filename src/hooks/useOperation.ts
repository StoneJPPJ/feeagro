'use client'

import { useState } from 'react'
import type { OperationFormData } from '@/types'

type Step = 'form' | 'summary' | 'success'

export function useOperation() {
  const [step, setStep] = useState<Step>('form')
  const [formData, setFormData] = useState<OperationFormData | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const goToSummary = (data: OperationFormData) => {
    setFormData(data)
    setStep('summary')
  }

  const confirm = async () => {
    setSubmitting(true)
    await new Promise((res) => setTimeout(res, 1200))
    setSubmitting(false)
    setStep('success')
  }

  const reset = () => {
    setFormData(null)
    setStep('form')
  }

  return { step, formData, submitting, goToSummary, confirm, reset }
}
