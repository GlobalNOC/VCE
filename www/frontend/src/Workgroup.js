import React, { Component } from 'react';


class WorkgroupList extends Component {
    render() {
        var workgroups = this.props.workgroups.map((wg) => <h2 key={wg}>{wg}</h2>);

        return (
            <div>
              {workgroups}
            </div>
        );
    }
}

class Workgroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workgroups: []
        };

        this.get_workgroups = this.get_workgroups.bind(this);
    }

    componentDidMount() {
        this.get_workgroups();
        this.interval = setInterval(() => this.get_workgroups(), 5000);
    }

    get_workgroups() {
        fetch('https://jonstout-dev.grnoc.iu.edu/vce/api/access.cgi?method=get_workgroups', {
            method: 'get'
        }).then((response) => {
            response.json().then((data) => this.setState({workgroups: data.results[0].workgroups}));
        });
    }

    render() {
        return (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1>Workgroups</h1>
                  <hr/>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-12">
                  <WorkgroupList workgroups={this.state.workgroups} />
                </div>
              </div>
            </div>
        );
    }
}

export {Workgroup};
