import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter,
  Routes
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contacts from "./Contacts";

class Main extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            <h1>Simple SPA</h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/stuff">Stuff</NavLink></li>
              <li><NavLink to="/contacts">Contact</NavLink></li>
            </ul>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/stuff" element={<Stuff/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
              </Routes>
            </div>
          </div>
        </HashRouter>
      );
    }
}

export default Main;