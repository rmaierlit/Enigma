/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function App() {
  return (
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  );
}

render(React.createElement(App), document.getElementById('app'));
