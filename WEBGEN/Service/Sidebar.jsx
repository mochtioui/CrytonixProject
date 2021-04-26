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
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col, Button
} from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import Web from '../../views/website_editor/Website'
import logo from "logo.svg";
import Session from 'react-session-api';
import jwt_decode from "jwt-decode";


// or

var ps;

class Sidebar extends React.Component {

  state = {
    log:"",
  }

    image= "no.png"
    name ="No Site selected"
     constructor(props) {
    super(props);

    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
    let data = sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    if(this.data!= null){this.image = this.data.logo_pic}
    if(this.data!= null){this.name = this.data.site_name}

  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  Stylebutton= ()=>{
    return{
      padding:'5px',
      background : 'white'
    }
  };

  Styleimage= ()=>{
    return{
      padding: '5px',
      width: '150px',
    }
  };
 clickclear() {
  sessionStorage.clear();
   window.location.reload(false);
}

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({log: jwt_decode(token).users.role});

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const {sites} = this.state;
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="http://localhost:3000/"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a

            className="simple-text logo-normal"
          >
            <span>
              website selected  :<br/>
              {this.name} <br/>
              <img className="group list-group-image" style={this.Styleimage()}
                   src={require('assets/img/'+this.image)}/>

            </span>
            <Button style={this.Stylebutton()}  color="danger"  onClick={() =>this.clickclear()}></Button>

          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              for (var i = 0; i < prop.Roles.length; i++) {
              if(
                  prop.Roles[i] === this.state.log

                 )
              {
                return (

                    <li
                        className={
                          this.activeRoute(prop.path) +
                          (prop.pro ? " active-pro" : "")
                        }
                        key={key}

                    >
                      <NavLink
                          to={prop.layout + prop.path}
                          className="nav-link"
                          activeClassName="active"
                      >
                        <i className={prop.icon}/>
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                );
              }}
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
