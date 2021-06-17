import React from 'react'
import { render, screen } from '@testing-library/react'
import Result from '../Result'

test('The Result component handles the errors', () => {
    const engine = 'google'
    const data = []
    const error = { msg: 'Missing info'}

    render(<Result engine={engine} data={data} error={error} />)
    const errorMessage = screen.getByText(/Missing info/i)
    expect(errorMessage).toBeInTheDocument()
})

test('When we have data, the engine is shown in a title in the results', () => {
    const engine = 'google'
    const data = [{
        displayed_link: 'https://google.com',
        link: 'https://google.com',
        title: 'Google',
        snippet: 'Google homepage'
    }]
    const error = null

    render(<Result engine={engine} data={data} error={error} />)
    const engineTitle = screen.getByTestId(engine)
    expect(engineTitle.innerHTML).toBe('google results')
    
})