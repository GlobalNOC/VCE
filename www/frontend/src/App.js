import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import logo from './logo.svg';
import './App.css';

import {Root} from './Root';
import {Switch} from './Switch';
import {Workgroup} from './Workgroup';

class Demo extends React.Component {
    render () {
        return (
            <h2>Demo comp</h2>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
              <Route path="/" component={Root}>
                <IndexRoute component={Demo} />
                <Route path="switch" component={Switch} />
                <Route path="workgroup" component={Workgroup} />
              </Route>
            </Router>
        );
    }
}

export default App;
