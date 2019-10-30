import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Menu from './pages/menu';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from './services/auth'

const PrivateRoute = ({ component: Component }) => (
    <Route
        render={props => isAuthenticated() === true ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )}
    />
)


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <PrivateRoute path="/menu" component={Menu} />
            <Route path='*' component={App} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
