/* eslint-env browser */
import React, { Component } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Button from 'material-ui/FlatButton';
import Input from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import CryptoJS from 'crypto-js';

function encrypt(text, password) {
  const ciphertext = CryptoJS.AES.encrypt(text, password);
  return ciphertext;
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', expDate: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEncrypt = this.handleEncrypt.bind(this);
  }

  handleChange(event, value) {
    const { name } = event.target;
    this.setState({ [name]: value });
  }

  handleDateChange(ignore, value) {
    this.setState({ expDate: value });
  }

  handleEncrypt() {
    alert(encrypt(this.state.message, 'lolwut'));
  }

  render() {
    return (
      <Card style={{ width: '350px', padding: '10px' }}>
        <CardTitle
          title="Robert's Enigma"
        />
        <Input
          type="text"
          floatingLabelFixed
          floatingLabelText="Message"
          hintText="(required)"
          name="message"
          multiLine
          maxLength={120}
          value={this.state.message}
          onChange={this.handleChange}
        />

        <DatePicker
          floatingLabelFixed
          floatingLabelText="Expiration Date"
          hintText="(required)"
          id="expDate"
          onChange={this.handleDateChange}
          value={this.state.expDate}
        />

        <CardActions>
          <Button label="Encrypt" onClick={this.handleEncrypt} />
          <Button label="Decrypt" />
        </CardActions>

      </Card>
    );
  }
}
export default Main;
