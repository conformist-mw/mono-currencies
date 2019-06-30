import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';

const currencyMap = {
    124: 'cad',
    203: 'czk',
    208: 'dkk',
    348: 'huf',
    643: 'rub',
    756: 'chf',
    826: 'gbp',
    840: 'usd',
    933: 'byn',
    949: 'try',
    978: 'eur',
    980: 'uah',
    985: 'pln',
}


function Currency(props) {
    const codeA = currencyMap[props.data.currencyCodeA];
    const codeB = currencyMap[props.data.currencyCodeB];
    return (
        <div>
            <Card border="success">
                <Card.Header className="text-uppercase">
                    <Link to={`/country/${codeA}`}>{codeA}</Link>
                     &nbsp;&hArr;&nbsp;
                    <Link to={`/country/${codeB}`}>{codeB}</Link>
                </Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush">
                        {props.data.rateSell && <ListGroupItem>Rate Sell: {props.data.rateSell}</ListGroupItem>}
                        {props.data.rateBuy && <ListGroupItem>Rate Buy: {props.data.rateBuy}</ListGroupItem>}
                        {props.data.rateCross && <ListGroupItem>Rate Cross: {props.data.rateCross}</ListGroupItem>}
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Last updated: <Timestamp relative date={props.data.date} />
                    </small>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Currency;
