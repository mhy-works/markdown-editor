import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from '../components/Button'

describe('Button', () => {
  it('childrenが表示される', () => {
    render(<Button variant="primary">Edit</Button>)
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })
})
