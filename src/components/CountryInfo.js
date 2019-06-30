import React, { Component } from 'react';
import { Image, Table } from 'react-bootstrap';


function TableRow(props) {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.value}</td>
        </tr>
    );
}


class CountryInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;
        fetch(`/country/${params.code}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ data: data[0] });
            })
    }

    render() {
        const country = this.state.data;
        return (
            <div>
                <h2 className="text-center mb-5">{country.name}</h2>
                <Table responsive striped>
                    <tbody>
                        <TableRow title="Country" value={country.name + ', ' + country.nativeName} />
                        <TableRow title="Capital" value={country.capital} />
                        <TableRow title="Region" value={country.region} />
                        <TableRow title="Numeric code (ISO-4217)" value={country.numericCode} />
                        <TableRow title="Top level domain" value={country.topLevelDomain} />
                        {this.state.data.currencies && this.state.data.currencies.map((curr, index) => (
                                <TableRow 
                                    key={index} 
                                    title="Name, code, symbol" 
                                    value={curr.name + ', ' + curr.code + ', ' + curr.symbol} 
                                />
                        ))}
                    </tbody>
                </Table>
                <Image src={country.flag} className="my-5" fluid />
            </div>
        );
    }
}

export default CountryInfo;
