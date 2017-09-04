/* eslint-env browser */
import React, { Component } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import Button from 'material-ui/FlatButton';
import Input from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Avatar from 'material-ui/Avatar';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import CryptoDialog from './CryptoDialog';


// client side encryption (first-layer)
function encrypt(text, password) {
  const ciphertext = CryptoJS.AES.encrypt(text, password);
  return ciphertext.toString();
}

function decrypt(ciphertext, password) {
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), password);
  return bytes.toString(CryptoJS.enc.Utf8);
}

class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      crypted: '',
      expDate: null,
      dialogOpen: false,
      changedSinceLastEncrypt: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEncrypt = this.handleEncrypt.bind(this);
    this.handleDecrypt = this.handleDecrypt.bind(this);
    this.updateFields = this.updateFields.bind(this);
  }

  handleChange(event, value) {
    const { name } = event.target;
    this.setState({ [name]: value, changedSinceLastEncrypt: true });
  }

  handleDateChange(alwaysNull, value) {
    this.setState({ expDate: value, changedSinceLastEncrypt: true });
  }

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  handleEncrypt() {
    if (this.state.changedSinceLastEncrypt) {
      // don't reencrypt the same message unless something has changed
      // changedSinceLastEncrypt: false,

      const encrypted = encrypt(this.state.message, this.props.passphrase)
      const { name, expDate } = this.state;
      const tablet = { encrypted, name, expDate };

      axios.post('/api/encryptTablet', { tablet })
        // store the encrypted tablet in the state, reset the tracker for changes
        .then(res => this.setState({ crypted: res.data, changedSinceLastEncrypt: false}))
        .then(this.handleOpen())
        .catch(err => console.error(err));
    } else {
      this.handleOpen();
    }
  }

  handleDecrypt() {
    axios.post('/api/decryptTablet', { encryptedTablet: this.state.crypted })
      .then(res => this.updateFields(res.data))
      .catch(err => console.error(err));
    this.handleClose();
  }

  updateFields(data) {
    const tablet = data;
    const { name, expDate, encrypted } = tablet;

    this.setState({
      name,
      message: decrypt(encrypted, this.props.passphrase),
      expDate: new Date(expDate),
    });
  }

  render() {
    return (
      <Card style={{ width: '360px', padding: '10px' }}>
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
export default CardView;
