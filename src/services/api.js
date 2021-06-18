import axios from "axios";

// const serphouse_api_url = 'https://api.serphouse.com/serp/live'
const serpwow_api_url = 'https://api.serpwow.com/live/search'

const query = (q, engine) => axios.get(serpwow_api_url, {
    params: {
        q,
        api_key: '8F36B6941EBC48EEB0F2944862C4F782',
        engine
    }
})

export const searchData = queryData => {
    const { searchInputValue, engine } = queryData
    if(engine === 'both'){
        return Promise.all([query(searchInputValue, 'google'), query(searchInputValue, 'bing')])
            .then(values => values)
    }
    return query(searchInputValue, engine)
}