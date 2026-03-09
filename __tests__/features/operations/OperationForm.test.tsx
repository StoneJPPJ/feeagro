import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OperationForm } from '@/features/operations/OperationForm'

function getForm(container: HTMLElement) {
  const form = container.querySelector('form')
  if (!form) throw new Error('Form not found')
  return form
}

describe('OperationForm', () => {
  it('renders all form fields', () => {
    render(<OperationForm onSubmit={jest.fn()} />)
    expect(screen.getByLabelText(/beneficiário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /revisar/i })).toBeInTheDocument()
  })

  it('shows validation error when beneficiary is empty', async () => {
    const { container } = render(<OperationForm onSubmit={jest.fn()} />)
    fireEvent.submit(getForm(container))
    await waitFor(() => {
      // Multiple alerts expected (beneficiary + amount)
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
    })
  })

  it('calls onSubmit with valid data', async () => {
    const onSubmit = jest.fn()
    const { container } = render(<OperationForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText(/beneficiário/i), 'João Silva')
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: '1500' } })
    fireEvent.submit(getForm(container))

    await waitFor(() => {
      // react-hook-form calls onSubmit(data, event) — match first arg only
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ beneficiary: 'João Silva', amount: 1500 }),
        expect.anything(),
      )
    })
  })

  it('shows error when amount is zero', async () => {
    const { container } = render(<OperationForm onSubmit={jest.fn()} />)
    await userEvent.type(screen.getByLabelText(/beneficiário/i), 'Alguém')
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: '0' } })
    fireEvent.submit(getForm(container))
    await waitFor(() => {
      expect(screen.getByText(/valor deve ser maior/i)).toBeInTheDocument()
    })
  })
})
