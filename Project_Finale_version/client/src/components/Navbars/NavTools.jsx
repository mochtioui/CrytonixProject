/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Detail Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

import routes from "routes.js";

class NavTools extends React.Component {
  render() {
    return (
      <div className="nav-tools">
        <div className="container">
            <Link to={'/admin/dashboard'} className="nav-item">
              Admin
            </Link>
        </div>
      </div>
    );
  }
}

export default NavTools;
