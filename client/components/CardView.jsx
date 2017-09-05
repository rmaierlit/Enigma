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
import ServerDialog from './ServerDialog';


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
      dialogMessage: '',
      changedSinceLastEncrypt: false,
      nameError: null,
      messageError: null,
      expError: null,
      serverMessage: null,
      serverDialogOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUntrackedChange = this.handleUntrackedChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEncrypt = this.handleEncrypt.bind(this);
    this.handleDecrypt = this.handleDecrypt.bind(this);
    this.updateFields = this.updateFields.bind(this);
    this.handleServerDialogClose = this.handleServerDialogClose.bind(this);
  }

  handleChange(event, value) {
    const { name } = event.target;
    this.setState({ [name]: value, changedSinceLastEncrypt: true });
  }

  handleUntrackedChange(event, value) {
    const { name } = event.target;
    this.setState({ [name]: value });
  }

  handleDateChange(alwaysNull, value) {
    this.setState({ expDate: value, changedSinceLastEncrypt: true });
  }

  handleOpen() {
    this.setState({ dialogOpen: true, dialogMessage: this.state.crypted });
  }

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  displayServerMessage(message) {
    this.setState({ serverDialogOpen: true, serverMessage: message });
  }

  handleServerDialogClose() {
    this.setState({ serverDialogOpen: false });
  }

  handleEncrypt() {
    const inputIsValid = this.validateInput();
    if (this.state.changedSinceLastEncrypt && inputIsValid) {
      // don't reencrypt the same message unless something has changed
      // changedSinceLastEncrypt: false,

      const encrypted = encrypt(this.state.message, this.props.passphrase)
      const { name, expDate } = this.state;
      const tablet = { encrypted, name, expDate };

      axios.post('/api/encryptTablet', { tablet })
        // store the encrypted tablet in the state, reset the tracker for changes
        .then(res => this.setState({
          crypted: res.data.encryptedTablet, changedSinceLastEncrypt: false },
          this.handleOpen, // callback to open dialog after setState is finished updating
        ))
        .catch(err => console.error(err));
    } else if (inputIsValid) {
      this.handleOpen();
    }
  }

  validateInput() {
    const inputErrors = [this.validName(), this.validMessage(), this.validExpiration()];
    if (inputErrors.includes(false)) {
      return false;
    }
    return true;
  }

  validName() {
    if (this.state.name === '') {
      this.setState({ nameError: 'name is required' });
      return false;
    }
    this.setState({ nameError: '' });
    return true;
  }

  validMessage() {
    if (this.state.message === '') {
      this.setState({ messageError: 'message is required' });
      return false;
    }
    this.setState({ messageError: '' });
    return true;
  }

  validExpiration() {
    if (this.state.expDate === null) {
      this.setState({ expError: 'expiration date is required' });
      return false;
    }
    this.setState({ expError: '' });
    return true;
  }

  handleDecrypt() {
    axios.post('/api/decryptTablet', { encryptedTablet: this.state.dialogMessage })
      .then((res) => {
        if (res.data.tablet) {
          this.updateFields(res.data.tablet);
        }

        if (res.data.message) {
          this.displayServerMessage(res.data.message);
        }
      })
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
      changedSinceLastEncrypt: true,
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
          errorText={this.state.nameError}
          errorStyle={{ float: 'left' }}
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
          errorText={this.state.messageError}
        />

        <DatePicker
          floatingLabelText="Expiration Date (required)"
          fullWidth
          onChange={this.handleDateChange}
          value={this.state.expDate}
          errorText={this.state.expError}
        />

        <CardActions>
          <Button label="Encrypt" onClick={this.handleEncrypt} />
          <Button label="Decrypt" onClick={this.handleOpen} />
        </CardActions>

        <CryptoDialog
          open={this.state.dialogOpen}
          dialogMessage={this.state.dialogMessage}
          handleChange={this.handleUntrackedChange}
          handleClose={this.handleClose}
          handleDecrypt={this.handleDecrypt}
        />

        <ServerDialog
          message={this.state.serverMessage}
          open={this.state.serverDialogOpen}
          handleClose={this.handleServerDialogClose}
        />

      </Card>
    );
  }
}
export default CardView;
