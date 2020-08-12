import React, { Component } from 'react'
import API from './utils/API'

export default class Row extends Component {
    state = {
        employees: [],
        search: ""
    }

    componentDidMount() {
        API.getEmployees()
            .then(res => this.setState({ employees: res.data.results }))
            .catch(err => console.log(err))
    }

    filterEmployees = (search) => {
        API.getEmployees()
            .then(res => {
                var currentList = res.data.results;
                var sorted = [];
                for (let i = 0; i < currentList.length; i++) {
                    if (currentList[i].name.first.includes((search).toLowerCase()) || currentList[i].name.last.includes((search).toLowerCase()) || currentList[i].email.includes((search).toLowerCase()) || currentList[i].cell.includes((search).toLowerCase())) {
                        sorted.push(currentList[i])
                    }
                }
                sorted.sort(
                    function(a, b){
                        if(a.name.first < b.name.first) { return -1; }
                        if(a.name.first > b.name.first) { return 1; }
                        return 0;
                    }
                );
                this.setState({ employees: sorted })
            })
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { value } = event.target;
        console.log(value)

        // Updating the input's state
        this.setState({
            search: value
        })
        // console.log(this.state.search)
        this.filterEmployees(value)
    };

    render() {
        return (

            <div>
                <form className="form m-2">
                    <input
                        value={this.state.search}
                        name="search"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Search Directory"
                    />
                </form>
                {this.state.employees.map(employee => (
                    <div className="row m-2">
                        <div className="col-md-1">
                            <img src={employee.picture.thumbnail} />
                        </div>
                        <div className="col-md-2">
                            <p>{employee.name.first} {employee.name.last} </p>
                        </div>
                        <div className="col-md-3">
                            <p>{employee.email}</p>
                        </div>
                        <div className="col-md-2">
                            <p>{employee.cell}</p>
                        </div>
                        <div className="col-md-4">
                            <p>Timezone: {employee.location.timezone.description}</p>
                        </div>
                    </div>
                ))}

            </div>

        )
    }
}
