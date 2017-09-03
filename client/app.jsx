/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main';
import GenerateHash from './components/GenerateHash';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function App() {
  return (
    <MuiThemeProvider>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={GenerateHash} />
            <Route path="/:hash" component={Main} />
          </Switch>
        </HashRouter>
      </div>
    </MuiThemeProvider>
  );
}

render(React.createElement(App), document.getElementById('app'));
