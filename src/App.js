import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login_page from "./login/login_page";
import Sign_page from "./sign/sign_page";
import Main from "./main/main";
import App1 from "./board/app1";
import Boardwrite from "./board/boardwrite";

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
          <Route exact path="/main">
            <Main />
          </Route>
          <Route exact path="/App1">
            <App1 />
          </Route>
          <Route exact path="/write">
            <Boardwrite />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
