import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
const CONFIG = {
    __APP_ID__:"aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5",
    BASE_URL:"https://api.unsplash.com/photos",
    SEARCH_URL:"https://api.unsplash.com/search/users"
}

ReactDOM.render(<App appId={CONFIG.__APP_ID__} baseUrl={CONFIG.BASE_URL} searchUrl={CONFIG.SEARCH_URL}/>, document.getElementById('root'));

