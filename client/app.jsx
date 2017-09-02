/* eslint-env browser */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './components/Main';
import CryptoJS from 'crypto-js';

function encrypt(text, password) {
  const ciphertext = CryptoJS.AES.encrypt(text, password);
  return ciphertext;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', expDate: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleEncrypt = this.handleEncrypt.bind(this);
  }

  handleChange(value, event) {
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleEncrypt() {
    alert(encrypt(this.state.message, 'lolwut'));
  }

  render() {
    return (
      <div>
        <h1>Father, give me legs!</h1>
        <Main
          handleChange={this.handleChange}
          handleEncrypt={this.handleEncrypt}
          message={this.state.message}
          expDate={this.state.expDate}
        />
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById('app'));
