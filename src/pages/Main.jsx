import React from 'react'
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import Result from '../components/Result'
import { useDispatch, useSelector } from 'react-redux'
import { searchAction, handleInputAction, setEngineAction } from '../redux/dataDuck'

const Main = () => {

    const dispatch = useDispatch()
    const { 
        searchInputValue, 
        engine, 
        searchResult, 
        fetchingData, 
        searchError 
    } = useSelector(store => store.data)

    const handleInput = ({target: {value}}) => dispatch(handleInputAction(value))
    const setEngine = ({target: {value}}) => dispatch(setEngineAction(value))
    const handleSubmit = event => (event.key === 'Enter' || event.type === 'click') && dispatch(searchAction())

    return (
        <div className='main-container'>
            <h1>Google / Bing Search</h1>
            <div className="search-bar-container">
                <Dropdown onChange={setEngine} value={engine}/>
                <input onChange={handleInput} onKeyPress={handleSubmit} value={searchInputValue} className='search-input'/>
                <Button loading={fetchingData} onClick={handleSubmit}/>
            </div>
            {
                fetchingData ? 
                    <p>Please wait while we search for {searchInputValue} in {engine === 'both' ? 'google and bing' : engine} ...</p>
                :
                <>
                    {Object.keys(searchResult).map( engine => {
                        const resultData = searchResult[engine]
                        return <Result key={engine} data={resultData} error={searchError} engine={engine}/>
                    }
                    )}
                </>
            }
        </div>
    )
}

export default Main
