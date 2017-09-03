import React from 'react';
import { Redirect } from 'react-router-dom';
import RandomString from 'randomstring';

// Component generates a random hash route and redirects to that route

function GenerateHash() {
  const hash = RandomString.generate(5);

  return (
    <Redirect to={`/${hash}`} />
  );
}

export default GenerateHash;
