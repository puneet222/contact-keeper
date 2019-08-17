import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import setHeaderToken from "./utils/setHeaderToken";

import AuthState from "./context/auth/AuthState";
import ContactState from "./context/contact/ContactState";
// import AlertState from "./context/alert/alertContext";

if (localStorage.token) {
  setHeaderToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      {/* <AlertState> */}
      <ContactState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </div>
        </Router>
      </ContactState>
      {/* </AlertState> */}
    </AuthState>
  );
}

export default App;
