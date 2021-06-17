import React from 'react'

export const ResultItem = ({item}) => {
    return (
        <div className='item-container'>
            <p className='item-display-link'>{item.displayed_link}</p>
            <a data-testid='title' className='item-title' href={item.link} target='_blank' rel='noreferrer'>{item.title}</a>
            {item.snippet && <p data-testid='snippet' className='item-snippet'>{item.snippet}</p>}
        </div>
    )
}
