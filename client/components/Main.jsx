import React from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';

const Main = props => (
  <Card style={{ width: '350px', padding: '10px' }}>
    <CardTitle
      title="Robert's Enigma"
    />
    <Input
      type="text"
      label="Message"
      name="message"
      required
      maxLength={120}
      value={props.message}
      onChange={props.handleChange}
    />

    <DatePicker
      label="Expiration Date"
      name="expDate"
      onChange={props.handleChange}
      value={props.expDate}
      sundayFirstDayOfWeek
    />

    <CardActions>
      <Button label="Encrypt" onClick={props.handleEncrypt} />
      <Button label="Decrypt" />
    </CardActions>

  </Card>
);

export default Main;
