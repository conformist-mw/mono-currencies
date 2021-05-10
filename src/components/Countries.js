import React, { Component } from 'react';
import Country from './Country';
import LinkFlag from './LinkFlag';

class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
        }
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;
        fetch(`/api/country/${params.code}`)
            .then(response => {
                return response.json();
            })
            .then(countries => {
                this.setState({ countries });
            })
    }

    render() {
        const countries = this.state.countries;

        return (
          <div>
              <div className="flags">
                  {countries.map(
                    (country, index) => <LinkFlag key={index} country={country} />
                  )}
              </div>
            <div>
                {countries.map((country, index) => <Country key={index} country={country} />)}
            </div>
          </div>
        );
    }
}

export default Countries;
