import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/FlatButton';

// displays messages from the server (such as when tablet is expired or cannot be decrypted)
function ServerDialog(props) {
  const actions = [
    <Button
      label="Ok"
      onClick={props.handleClose}
    />,
  ];

  return (
    <Dialog
      actions={actions}
      open={props.open}
      onRequestClose={props.handleClose}
    >
      <h2 style={{ color: 'rgb(244, 67, 54)' }}>{props.message}</h2>
    </Dialog>
  );
}

export default ServerDialog;
