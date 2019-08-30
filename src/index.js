import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import reducer from './redux/reducers';
import rootSaga from './redux/sagas';
import theme from './MaterialUIPalette';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const store = createStore(connectRouter(history)(reducer), applyMiddleware(routerMiddleware(history), sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App history={history} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
