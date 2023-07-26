import { Component } from "react";
import './sidenav.css'
import {
  NavLink,
} from "react-router-dom";

class SideNav extends Component {
  render() {
    return (
      <div id="mySidenav" class="sidenav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/stuff">Stuff</NavLink>
        <NavLink to="/contacts">Contact</NavLink>
      </div>
    );
  }
}

export default SideNav;