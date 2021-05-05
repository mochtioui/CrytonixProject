
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";
import Website from "./views/website/website";
import BlockEditor from "./views/block-editor/layouts/block-editor";

import Login from "./views/Login/Login.jsx";
import register2 from "./views/register/register-freelancer-contentEditor"
import register from "./views/register/register";
import Blog from "./views/Blog/Editor.jsx"
import Web_add from "./views/website_editor/web_add";
const hist = createBrowserHistory();
const test = 1;
const token = localStorage.getItem("token");
const PrivateRoute = ({ component: Component, ...rest }) =>(
    <Route {...rest} render={(props) => (
      token !== ""
       ? <AdminLayout {...props}/>
         :<Redirect to='/login'/>
    )

    }  />
)



ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/website" component={Website} />
      <Route exact path="/block-editor" component={BlockEditor} />
      <Route path="/block-editor/:pageId" component={BlockEditor} />
        <Route  path={"/Blog"} component={Blog}/>

      <Route  path={"/login"} component={Login}/>
      <PrivateRoute path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect to="/admin/dashboard" />
      <Route path="/Website_add" component={Web_add} />



    </Switch>
  </Router>,
  document.getElementById("root")
);
