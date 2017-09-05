import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import RandomString from 'randomstring';
import Button from 'material-ui/RaisedButton';

class GenerateNewHash extends Component {
  redirectToNewHash() {
    const hash = RandomString.generate(5);
    this.props.history.push(`/${hash}`);
  }

  render() {
    return (
      <h5
        style={{
          textAlign: 'Center',
          fontFamily: 'Roboto',
          cursor: 'pointer',
          color: 'blue',
          textDecoration: 'underline',
        }}
        onClick={this.redirectToNewHash.bind(this)}
      >
        Generate New Passphrase
      </h5>
    );
  }
}

export default withRouter(GenerateNewHash);
