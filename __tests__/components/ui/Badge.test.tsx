import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Concluído</Badge>)
    expect(screen.getByText('Concluído')).toBeInTheDocument()
  })

  it('applies success variant classes', () => {
    render(<Badge variant="success">OK</Badge>)
    const el = screen.getByText('OK')
    expect(el).toHaveClass('bg-brand-100')
    expect(el).toHaveClass('text-brand-700')
  })

  it('applies error variant classes', () => {
    render(<Badge variant="error">Erro</Badge>)
    const el = screen.getByText('Erro')
    expect(el).toHaveClass('bg-red-100')
  })

  it('applies default variant when no variant is provided', () => {
    render(<Badge>Default</Badge>)
    const el = screen.getByText('Default')
    expect(el).toHaveClass('bg-stone-100')
  })
})
