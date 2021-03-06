import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import accountReducer from "./store/reducers/accountReducer";
import {rootSaga} from "./store/sagas/rootSaga";
import declarationsReducer from "./store/reducers/declarationsReducer";
import groupsReducer from "./store/reducers/groupsReducer";
import studentsReducer from "./store/reducers/studentsReducer";
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import commentReducer from "./store/reducers/commentReducer";

const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    declarations: declarationsReducer,
    groups: groupsReducer,
    student: studentsReducer,
    comment: commentReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

sagaMiddleware.run(rootSaga);


const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
