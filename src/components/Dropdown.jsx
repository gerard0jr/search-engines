import React from 'react'

const Dropdown = ({onChange, value}) => {
    return (
        <select onChange={onChange} value={value} className='engine-selector'>
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="both">Both</option>
        </select>
    )
}

export default Dropdown
