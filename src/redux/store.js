import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dataReducer from './dataDuck'

const rootReducer = combineReducers({
    data: dataReducer
})

const middlewares = [thunk]

const generateStore = () => createStore(
    rootReducer,
    applyMiddleware(...middlewares)
)

export default generateStore