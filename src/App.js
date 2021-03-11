import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./main/main";
import App1 from "./board/app1";
import Boardwrite from "./board/boardwrite";
import AlertDialogSlide from "./board/deleteBoard";

import Socket1 from "./socket1";
import Socket2 from "./socket2";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/1">
            <Socket1 />
          </Route>
          <Route path="/2">
            <Socket2 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
