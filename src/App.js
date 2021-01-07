import logo from './logo.svg';
import './App.css';
import React ,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login_page from './login/login_page';
import Sign_page from './sign/sign_page';

function App() {
  return (
 
    <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Login_page />
        </Route>
        <Route exact path="/sign">
          <Sign_page />
        </Route>
      </Switch>
    </div>
  </Router>
  
  );
}

export default App;
