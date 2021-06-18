import { searchData } from "../services/api"

// Initial state
const initialData = {
    searchInputValue: '',
    engine: 'google',
    searchResult: {},
    fetchingData: false,
    searchError: null
}

// Actions constants
const HANDLE_INPUT = 'HANDLE_INPUT'
const SET_ENGINE = 'SET_ENGINE'
const SEARCH = 'SEARCH'
const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
const SEARCH_ERROR = 'SEARCH_ERROR'

// Reducer
const reducer = (state = initialData, action) => {
    switch(action.type) {
        case HANDLE_INPUT:
            return {...state, searchInputValue: action.payload}
        case SET_ENGINE:
            return {...state, engine: action.payload}
        case SEARCH:
            return {...state, fetchingData: true, searchResult: [], searchError: null}
        case SEARCH_SUCCESS:
            return {...state, fetchingData: false, searchResult: action.payload}
        case SEARCH_ERROR:
            return {...state, fetchingData: false, searchError: action.payload}
        default:
            return {...state}
    }
}

export default reducer

// Actions creators
export const setEngineAction = engine => dispatch => {
    dispatch({
        type: SET_ENGINE,
        payload: engine
    })
}

export const handleInputAction = inputString => dispatch => {
    dispatch({
        type: HANDLE_INPUT,
        payload: inputString
    })
}

export const searchAction = () => (dispatch, getState) => {
    dispatch({
        type: SEARCH
    })
    const { searchInputValue, engine } = getState().data
    if(!searchInputValue) return dispatch({
        type: SEARCH_ERROR,
        payload: { message: 'Please write something to search' }
    })
    const queryData = {
        searchInputValue,
        engine
    }
    searchData(queryData)
        .then(searchResult => {
            // Both engines
            if(searchResult.length){
                const combinedResult = {
                    google: searchResult[0].data.organic_results,
                    bing: searchResult[1].data.organic_results
                }
                return dispatch({
                    type: SEARCH_SUCCESS,
                    payload: combinedResult
                })    
            }
            // Just one engine
            const { data } = searchResult
            const singleResult = {}
            singleResult[engine] = data.organic_results
            dispatch({
                type: SEARCH_SUCCESS,
                payload: singleResult
            })
        })
        .catch(error => {
            dispatch({
                type: SEARCH_ERROR,
                payload: { message: 'Something went wrong, please try again' }
            })
        })
}