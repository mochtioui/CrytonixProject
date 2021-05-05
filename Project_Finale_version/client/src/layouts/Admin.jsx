
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";


import routes from "routes.js";
import serviceSite from "../services/website.service";
import AddProduct from "../views/product/AddProduct";
import jwt_decode from "jwt-decode";

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      activeColor: "info",
      website: '',
      log:"",
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({log: jwt_decode(token).users.role});
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

    serviceSite.webSite()
        .then( res => {
          this.setState({
            website : res
          });
        })
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    const {sites} = this.state;
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              for (var i = 0; i < prop.Roles.length; i++) {
                if(
                    prop.Roles[i] === this.state.log

                ) {
                  return (
                      <Route
                          path={prop.layout + prop.path}
                          component={() => <prop.component website={this.state.website}/>}
                          key={key}
                      />
                  );
                }}})}
            <Route
                path={'/admin/product/add'}
                component={() => <AddProduct website={this.state.website}/>}
            />
          </Switch>
          <Footer fluid />
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        />*/}
      </div>
    );
  }
}

export default Dashboard;
