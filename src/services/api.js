import axios from "axios";

const api_url = 'https://api.serphouse.com/serp/live'

const query = (q, domain) => axios.get(api_url, {
    params: {
        q,
        domain: `${domain}.com`,
        lang: domain === 'bing' ? 'en-US' : 'en'
    },
    headers: {
        "authorization": `Bearer ${process.env.REACT_APP_SERP_API_KEY}`
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