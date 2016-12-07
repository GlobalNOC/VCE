import React from 'react';

import {Navigation} from './Navigation';


class Root extends React.Component {
    render() {
        return (
            <div className="container">
              <Navigation/>

              {this.props.children}
            </div>
        );
    }
}

export {Root};
