import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '../Button'

test('When loading, text is changed to searching', () => {
    const loading = true
    render(<Button loading={loading} />)
    const linkElement = screen.getByText(/Searching.../i)
    expect(linkElement).toBeInTheDocument()
})

test('When not loading, text is changed to search', () => {
    const loading = false
    render(<Button loading={loading} />)
    const linkElement = screen.getByText(/Search/i)
    expect(linkElement).toBeInTheDocument()
})