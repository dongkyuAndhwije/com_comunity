import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./main/main";
import App1 from "./board/app1";
import Boardwrite from "./board/boardwrite";
import AlertDialogSlide from "./board/deleteBoard";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/App1">
            <App1 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
