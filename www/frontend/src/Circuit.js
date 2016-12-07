import React, { Component } from 'react';
import {Link} from 'react-router';

class Circuit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            circuit: {endpoints: []}
        };

        this.get_circuit = this.get_circuit.bind(this);        
    }

    componentDidMount() {
        this.get_circuit();
    }

    get_circuit() {
        var url = 'https://jonstout-dev.grnoc.iu.edu/vce/api/access.cgi?method=get_vlan_details';
        url += '&vlan_id='   + this.props.vlan_id;
        url += '&workgroup=' + this.props.workgroup;

        fetch(url, {method: 'get'}).then((response) => {
            response.json().then((data) => this.setState({circuit: data.results[0].circuit}));
        });
    }

    render() {
        var endpoints = this.state.circuit.endpoints.map((e) => <p>Switch: {e.switch} Port: {e.port} VLAN: {e.tag}</p>);
        var status;

        return (
            <div>
              <p>
                {this.state.circuit.status} {this.state.circuit.description} <Link to={"/edit-vlan"}>edit</Link>
              </p>
              {endpoints}
              <hr/>
            </div>
        );
    }
}

class CircuitList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            circuits: []
        }

        this.get_circuits = this.get_circuits.bind(this);
    }

    componentDidMount() {
        this.get_circuits();
        this.interval = setInterval(() => this.get_circuits(), 5000);
    }

    get_circuits() {
        var url = 'https://jonstout-dev.grnoc.iu.edu/vce/api/access.cgi?method=get_vlans';
        url += '&workgroup=' + this.props.workgroup;
        fetch(url, {method: 'get'}).then((response) => {
            response.json().then((data) => this.setState({circuits: data.results[0].vlans}));
        });
    }

    render() {
        var circuits = this.state.circuits.map((c) => <Circuit key={c} vlan_id={c} workgroup={this.props.workgroup}/>);
        
        return (
            <div>
              <h3>Circuits</h3>
              <hr/>
              {circuits}
            </div>
        );
    }
}

export default CircuitList;
