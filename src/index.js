import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore();
console.log('store is', store);
// console.log(store.getState()); // here we are gettin gthe state
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
