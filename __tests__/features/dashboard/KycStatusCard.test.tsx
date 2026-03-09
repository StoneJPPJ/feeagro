import { render, screen } from '@testing-library/react'
import { KycStatusCard } from '@/features/dashboard/KycStatusCard'

describe('KycStatusCard', () => {
  it('shows loading skeleton when loading', () => {
    const { container } = render(<KycStatusCard status={null} loading />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('shows "Verificado" when status is approved', () => {
    render(<KycStatusCard status="approved" loading={false} />)
    expect(screen.getByText('Verificado')).toBeInTheDocument()
  })

  it('shows "Em análise" when status is pending', () => {
    render(<KycStatusCard status="pending" loading={false} />)
    expect(screen.getByText('Em análise')).toBeInTheDocument()
  })

  it('shows "Rejeitado" when status is rejected', () => {
    render(<KycStatusCard status="rejected" loading={false} />)
    expect(screen.getByText('Rejeitado')).toBeInTheDocument()
  })
})
