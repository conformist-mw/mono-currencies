import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Footer(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <a href="https://github.com/conformist-mw" className="text-white">Just for fun</a>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <a href="https://github.com/conformist-mw/react-currency.git" className="text-white">Source</a>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Footer;
