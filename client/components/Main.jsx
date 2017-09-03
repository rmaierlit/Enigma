import React from 'react';
import { Link } from 'react-router-dom';
import CardView from './CardView';

function Main(props) {
  return (
    <div>
      <CardView passphrase={props.match.params.hash}/>
      <h5 style={{ textAlign: 'Center', fontFamily: 'Roboto' }}>
        Your Passphrase - <span style={{ color: 'blue' }}>{props.match.params.hash}</span>
      </h5>
      <Link to="/">
        <h5 style={{ color: 'blue', textAlign: 'Center', fontFamily: 'Roboto' }}>
          Generate New Passphrase
        </h5>
      </Link>
    </div>
  );
}

export default Main;
