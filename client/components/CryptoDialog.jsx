import React from 'react';
import Dialog from 'material-ui/Dialog';
import Input from 'material-ui/TextField';
import Button from 'material-ui/FlatButton';

function CryptoDialog(props) {
  const actions = [
    <Button
      label="Cancel"
      primary
      onClick={props.handleClose}
    />,
    <Button
      label="Decrypt"
      primary
      onClick={props.handleDecrypt}
    />,
  ];

  return (
    <Dialog
      title="De/Encrypt"
      actions={actions}
      open={props.open}
      onRequestClose={props.handleClose}
    >
      <Input 
        type="text"
        name="dialogMessage"
        floatingLabelText="Message"
        fullWidth
        multiLine
        value={props.dialogMessage}
        onChange={props.handleChange}
      />
    </Dialog>
  );
}

export default CryptoDialog;
