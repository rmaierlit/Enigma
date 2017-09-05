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
      title="Error"
      actions={actions}
      open={props.open}
      onRequestClose={props.handleClose}
    >
      {props.message}
    </Dialog>
  );
}

export default ServerDialog;
