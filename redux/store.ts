import { applyMiddleware, createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/index';
import rootSaga from './sagas';
// import { preloadedState } from './preloadedState';

const bindMiddleware = (middleware: Middleware[]) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

export const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
    sagaMiddleware.run(rootSaga);
    return store;
}

export const storeWrapper = createWrapper<any>(makeStore, { debug: true });