import React, { useState } from 'react'
import { useEffect } from 'react'
import { ResultItem } from './ResultItem'

const ELEMENTS_PER_PAGE = 5

const Result = ({engine, data, error}) => {
    
    const [pagination, setPagination] = useState({
        page: 0,
        totalPages: 1
    })

    const previousPage = () => {
        if(pagination.page <= 0) return 
        setPagination(pagination => ({
            ...pagination,
            page: pagination.page - 1
        }))
    }

    const nextPage = () => {
        if(pagination.page >= pagination.totalPages - 1) return 
        setPagination(pagination => ({
            ...pagination,
            page: pagination.page + 1
        }))
    }

    useEffect(() => {
        setPagination(pagination => ({
            ...pagination,
            totalPages: Math.round(data.length / ELEMENTS_PER_PAGE),
            leftIndex: pagination.page * 5,
            rightIndex: (pagination.page * ELEMENTS_PER_PAGE) + 5
        }))
    }, [data.length])

    useEffect(() => {
        setPagination(pagination => ({
            ...pagination,
            leftIndex: (pagination.page * 5),
            rightIndex: (pagination.page * ELEMENTS_PER_PAGE) + 5
        }))
    }, [pagination.page])

    return (
        <div className="results-container">
            {
                error ? 
                    <p>{error.msg}</p>
                :   
                    <div className="engine-container">
                        <p data-testid={engine} className='engine-title'>{engine} results</p>
                        {
                            data.filter((_, idx) => idx >= pagination.leftIndex && idx < pagination.rightIndex)
                            .map( result => 
                                <ResultItem key={result.position} item={result} />
                            )
                        }
                        <div className="pagination-container">
                            <p onClick={previousPage}>Prev</p>
                            <p>{pagination.page + 1} of {pagination.totalPages}</p>
                            <p onClick={nextPage}>Next</p>
                        </div>
                    </div>
            }
            
        </div>
    )
}

export default Result
