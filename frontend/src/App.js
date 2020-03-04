import React from 'react';

import { Provider } from 'react-redux';
import store from './state';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

// Pages
import BinCollectPage from './page/bin_collect';
import StartPage from './page/start';


function App() {
  return (
    <Provider store={store}>
      <Router>
        

        <Switch>
          <Route path="/">
            <StartPage/>
          </Route>
          <Route path="/collect">
            <BinCollectPage/>
          </Route>
        </Switch>

      </Router>
    </Provider>
  );
}


export default App;
