import React from 'react'
import { ResultItem } from '../ResultItem'
import { create } from 'react-test-renderer'

  
test('The component renders correctly', () => {
    const item = {
        displayed_link: 'https://google.com',
        link: 'https://google.com',
        title: 'Google',
        snippet: 'Google homepage'
    }
    const component = create(<ResultItem item={item} />)
    const title = component.toJSON().children[1].children[0]
    expect(title).toBe('Google')
})


test('When no snippet is present, the snippet paragraph is not shown', () => {
    const item = {
        displayed_link: 'https://google.com',
        link: 'https://google.com',
        title: 'Google',
        snippet: ''
    }
    const component = create(<ResultItem item={item} />)
    const snippet = component.toJSON().children[2]
    expect(snippet).toBe('')
})
