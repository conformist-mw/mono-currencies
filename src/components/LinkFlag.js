import React, { Component } from 'react';
import { Image } from 'react-bootstrap';


class LinkFlag extends Component {

  render() {
    const country = this.props.country;
    return (
      <a href={'#' + country.alpha3Code}>
        <Image className="flagThumb" src={country.flag} thumbnail />
      </a>
    );
  }
}

export default LinkFlag;
