import React, { Component } from 'react';
import CircuitList from './Circuit';

class SwitchDescription extends Component {
    render() {
        return (
            <div>
              <h2>{this.props.name}</h2>
              <p><b>Address</b>: {this.props.ip_addr}</p>
              <p><b>Description</b>: {this.props.description}</p>
            </div>
        );
    }
}

class SwitchProxy extends Component {
    render() {
        var preStyle = {
            minHeight: '600px',
        };

        return (
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-group">
                    <div className="input-group-btn">
                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span className="caret"></span></button>
                      <ul className="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#">Separated link</a></li>
                      </ul>
                    </div>
                    <input type="text" className="form-control" aria-label="..." />
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-lg-12">
                  <br/>
                  <pre style={preStyle}></pre>
                </div>
              </div>
            </div>
        );
    }
}

class SwitchElem extends Component {
    render() {
        return (
            <tr><td>{this.props.name}</td><td>{this.props.state}</td></tr>
        );
    }
}

class SwitchList extends Component {
    render() {
        var switches = this.props.switches.map((sw) =>
                                               <SwitchElem name={sw.name} state={sw.state} />);

        return (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr><th>Name</th><th>State</th></tr>
                </thead>
                <tbody>
                  {switches}
                </tbody>
              </table>
            </div>
        );
    }
}

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switches: [
                {name:  'Switch 1', state: 'up', ip_addr: '127.0.0.1', description: 'The very first of switches'},
                {name:  'Switch 2', state: 'up'}
            ],
            workgroup: 'ajco'
        };
    }

    render() {
        var cur = this.state.switches[0];

        return (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <SwitchDescription name={cur.name} ip_addr={cur.ip_addr} description={cur.description} />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-4">
                  <SwitchList switches={this.state.switches} />
                  <CircuitList workgroup={this.state.workgroup}/>
                </div>
                <div className="col-md-8">
                  <SwitchProxy/>
                </div>
              </div>
            </div>
        );
    }
}

export {Switch};
