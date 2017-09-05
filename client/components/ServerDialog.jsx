import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/FlatButton';

// displays messages from the server (such as when tablet is expired or cannot be decrypted)
function ServerDialog(props) {
  return (
    <Dialog open={props.open} onRequestClose={props.handleClose}>
      <h2>{props.message}</h2>
    </Dialog>
  );
}

export default ServerDialog;
