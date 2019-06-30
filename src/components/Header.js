import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Currencies by Monobank API</Navbar.Brand>
                <Navbar.Text>
                    <Link to='/'>Home</Link>
                </Navbar.Text>
                <Navbar.Collapse className="justify-content-end">
                    <a href="https://api.monobank.ua/docs/" className="text-white">Docs</a>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
