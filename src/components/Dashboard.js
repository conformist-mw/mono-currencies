import React, { Component } from 'react';
import { CardColumns } from 'react-bootstrap';
import Currency from './Currency';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
        };
    }
    componentDidMount = () => {
        fetch('/api/currencies')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ currencies: data });
            })
    }

    render() {
        return (
            <CardColumns>
                {this.state.currencies.map((curr, index) => <Currency key={index} data={curr} />)}
            </CardColumns>
        );
    }
}

export default Dashboard;
