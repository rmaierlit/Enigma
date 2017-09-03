/* eslint-env browser */
import React, { Component } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Button from 'material-ui/FlatButton';
import Input from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import CryptoJS from 'crypto-js';
import CryptoDialog from './CryptoDialog';

function encrypt(text, password) {
  const ciphertext = CryptoJS.AES.encrypt(text, password);
  return ciphertext.toString();
}

function decrypt(ciphertext, password) {
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), password);
  return bytes.toString(CryptoJS.enc.Utf8);
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', message: '', crypted: '', expDate: null, dialogOpen: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEncrypt = this.handleEncrypt.bind(this);
    this.handleDecrypt = this.handleDecrypt.bind(this);
  }

  handleChange(event, value) {
    const { name } = event.target;
    this.setState({ [name]: value });
  }

  handleDateChange(alwaysNull, value) {
    this.setState({ expDate: value });
  }

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  handleEncrypt() {
    this.setState({ crypted: encrypt(this.state.message, 'lolwut') });
    this.handleOpen();
  }

  handleDecrypt() {
    this.setState({ message: decrypt(this.state.crypted, 'lolwut') });
    this.handleClose();
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
          fullWidth
          multiLine
          maxLength={120}
          rowsMax={5}
          value={this.state.message}
          onChange={this.handleChange}
        />

        <DatePicker
          floatingLabelText="Expiration Date (required)"
          fullWidth
          onChange={this.handleDateChange}
          value={this.state.expDate}
        />

        <CardActions>
          <Button label="Encrypt" onClick={this.handleEncrypt} />
          <Button label="Decrypt" onClick={this.handleOpen} />
        </CardActions>

        <CryptoDialog
          open={this.state.dialogOpen}
          crypted={this.state.crypted}
          handleChange={this.handleChange}
          handleClose={this.handleClose}
          handleDecrypt={this.handleDecrypt}
        />

      </Card>
    );
  }
}
export default Main;
