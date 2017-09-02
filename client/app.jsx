/* eslint-env browser */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Main from './Main.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', expDate: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, event) {
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h1>Father, give me legs!</h1>
        <Main
          handleChange={this.handleChange}
          message={this.state.message}
          expDate={this.state.expDate}
        />
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById('app'));
