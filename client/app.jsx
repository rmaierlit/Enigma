/* eslint-env browser */
import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
  render() {
    return (
      <h1>Father, give me legs!</h1>
    );
  }
}

render(React.createElement(App), document.getElementById('app'));
