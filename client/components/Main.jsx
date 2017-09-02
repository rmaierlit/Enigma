/* eslint-env browser */
import React, { Component } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Button from 'material-ui/FlatButton';
import Input from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import CryptoJS from 'crypto-js';

function encrypt(text, password) {
  const ciphertext = CryptoJS.AES.encrypt(text, password);
  return ciphertext;
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', message: '', expDate: null };
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
        <Avatar style={{ marginRight: '10px' }}>
          {this.state.name.length > 0 ? this.state.name.charAt(0) : '/'}
        </Avatar>
        <Input
          type="text"
          floatingLabelText="Name (required)"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <Input
          type="text"
          floatingLabelText="Message (required)"
          name="message"
          multiLine
          maxLength={120}
          rowsMax={5}
          value={this.state.message}
          onChange={this.handleChange}
        />

        <DatePicker
          floatingLabelText="Expiration Date (required)"
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
