import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SalesApp } from './SalesApp';
import { store } from './store/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <SalesApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
