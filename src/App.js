import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Countries from './components/Countries';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Container className="mt-5">
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/country/:code' component={Countries} />
          </Container>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
