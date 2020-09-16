import React from "react";
import "./App.css";
import Store from "./Utils/Store";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Store>
      <div className="main">
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route exact path="/" render={props => <Login {...props} />} />
        </Switch>
      </div>
    </Store>
  );
}

export default App;
