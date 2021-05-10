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


class Country extends Component {

  render() {
    const country = this.props.country;
    return (
      <div>
        <h2 className="text-center mb-5" id={country.alpha3Code}>{country.name}</h2>
        <Table responsive striped>
          <tbody>
          <TableRow title="Country" value={country.name + ', ' + country.nativeName} />
          <TableRow title="Capital" value={country.capital} />
          <TableRow title="Region" value={country.region} />
          <TableRow title="Numeric code (ISO-4217)" value={country.numericCode} />
          <TableRow title="Top level domain" value={country.topLevelDomain} />
          {country.currencies && country.currencies.map((curr, index) => (
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

export default Country;
