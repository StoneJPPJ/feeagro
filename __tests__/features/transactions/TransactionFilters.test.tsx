import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TransactionFilters } from '@/features/transactions/TransactionFilters'

const defaultFilters = { search: '', type: 'ALL' as const, status: 'ALL' as const }

describe('TransactionFilters', () => {
  it('renders search input and selects', () => {
    render(<TransactionFilters filters={defaultFilters} onChange={jest.fn()} />)
    expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/filtrar por tipo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/filtrar por status/i)).toBeInTheDocument()
  })

  it('calls onChange with search value', async () => {
    const onChange = jest.fn()
    render(<TransactionFilters filters={defaultFilters} onChange={onChange} />)
    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'PIX')
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ search: expect.stringContaining('P') }))
  })

  it('calls onChange when type filter changes', async () => {
    const onChange = jest.fn()
    render(<TransactionFilters filters={defaultFilters} onChange={onChange} />)
    await userEvent.selectOptions(screen.getByLabelText(/filtrar por tipo/i), 'IN')
    expect(onChange).toHaveBeenCalledWith({ type: 'IN' })
  })
})
