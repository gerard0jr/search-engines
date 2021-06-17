import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import generateStore from './redux/store'

const store = generateStore()

const WithStore = () => <Provider store={store}><App/></Provider>

ReactDOM.render(
  <React.StrictMode>
    <WithStore />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
