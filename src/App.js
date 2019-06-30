import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CountryInfo from './components/CountryInfo';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }
  componentDidMount = () => {
    fetch('http://localhost:8000/currencies')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ currencies: data });
      })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Container className="mt-5">
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/country/:code' component={CountryInfo} />
          </Container>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
