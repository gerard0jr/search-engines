import React from 'react'

const Button = ({onClick, loading}) => {
    return (
        <button disabled={loading} onClick={onClick} className='search-button'>
            {loading ? 'Searching...' : 'Search'}
        </button>
    )
}

export default Button
