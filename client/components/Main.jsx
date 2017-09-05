import React from 'react';
import CardView from './CardView';
import GenerateNewHash from './GenerateNewHash';

function Main(props) {
  return (
    <div>
      <CardView passphrase={props.match.params.hash}/>
      <h5 style={{ textAlign: 'Center', fontFamily: 'Roboto' }}>
        Your Passphrase - <span style={{ color: 'blue' }}>{props.match.params.hash}</span>
      </h5>
      <GenerateNewHash />
    </div>
  );
}

export default Main;
