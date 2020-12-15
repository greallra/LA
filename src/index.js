import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MainRouter from './router/MainRouter';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { configureStore } from './redux/configureStore';

ReactDOM.render(
  <React.StrictMode>
      <ReduxProvider store={configureStore()}>
        <MainRouter />
      </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
