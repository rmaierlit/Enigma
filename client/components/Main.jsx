import React from 'react';
import CardView from './CardView';

function Main(props) {
  return (
    <div>
      <CardView passphrase={props.match.params.hash}/>
      <h5 style={{ textAlign: 'Center', fontFamily: 'Roboto' }}>
        Your Passphrase - <strong style={{ color: 'blue' }}>{props.match.params.hash}</strong>
      </h5>
    </div>
  );
}

export default Main;
