import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {useState} from 'react';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

firebase.firestore().settings({ experimentalForceLongPolling: true });

function App() {

  const [{user}, dispatch] = useStateValue();

  return (

    <div className="app">
      {!user ? (
        <Login />
      ) : (
      <div className="app__body">
        <Router>
          <Switch>
            <Route path="/rooms/:roomId">
              <Sidebar />
              <Chat />
            </Route>
            <Route path="/">
              <Sidebar />
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
