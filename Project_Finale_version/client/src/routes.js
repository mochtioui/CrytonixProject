
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Websites from "views/Websites.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import UserPage from "views/User.jsx";
import UpgradeToPro from "views/Upgrade.jsx";
import Pages from "views/pages/page";
import Theme from "views/themes/theme";
import Component from "views/Component.jsx";
import register from "views/register/register.jsx"
import Login from "views/Login/Login.jsx";
import productTypes from "views/productType/productTypes";
import productSubTypes from "./views/productSubType/ProductSubTypes";
import productProperties from "./views/productProperty/productProperties";
import Blog from "./views/Blog/Blog"
import yourBlog from "./views/Blog/YourBlog.js"
import TextApi from "./views/Blog/TextApi";
import Blogvalidation from "./views/Blog/BlogValidation.js"

import Ads_banner from "./views/Ads_banner/Ads_banner";
import Web from "./views/website_editor/Website";
import Users from "./views/Users/Users.jsx"
import AddProduct from "./views/product/AddProduct";
import Products from "./views/product/Products";
import CountryProducts from "./views/product/CountryProducts";
import tracking from "./views/tracking/tracking";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    Roles: ["Administrator","Content coordinator","Content director","Sales manager","Freelancer","Content Editor"]
  },
  {
    path: "/pages",
    name: "Pages",
    icon: "nc-icon nc-single-copy-04",
    component: Pages,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer","Content Editor"]
  },
  {

    path: "/Websites",
    name: "Websites",
    icon: "nc-icon nc-globe",
    component: Web,
    layout: "/admin",
    Roles: ["Administrator","Content director","Content Editor"]
  },
 
   
  
  
 
  
 
  {
    path: "/themes",
    name: "Theme",
    icon: "nc-icon nc-laptop",
    component: Theme,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/components",
    name: "Component",
    icon: "nc-icon nc-layout-11",
    component: Component,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },

  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-credit-card",
    component: Products,
    layout: "/admin",
    Roles: ["Administrator","Content director","Content Editor","Freelancer","Content coordinator"]
  },
  {
    path: "/productTypes",
    name: "Product Category",
    icon: "nc-icon nc-credit-card",
    component: productTypes,
    layout: "/admin",
    Roles: ["Administrator","Content director","Content Editor","Content coordinator"]
  },
  {
    path: "/productSubTypes",
    name: "Product Sub-Category",
    icon: "nc-icon nc-credit-card",
    component: productSubTypes,
    layout: "/admin",
    Roles: ["Administrator","Content director","Content Editor","Content coordinator"]
  },

  
  /*
  {
    path: "/countryproducts",
    name: "Country Products",
    icon: "nc-icon nc-credit-card",
    component: CountryProducts,
    layout: "/admin",
    Roles: ["Administrator","Content director","Content Editor","Content coordinator"]
  },
  */
  {
    path: "/productProperties",
    name: "Product Properties",
    icon: "nc-icon nc-credit-card",
    component: productProperties,
    layout: "/admin",
    Roles: ["Administrator","Content director","Content Editor","Content coordinator"]

  },


  {
    path: "/register",
    name: "register",
    icon: "nc-icon nc-single-02",
    component: register,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },
  {
    path: "/Users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },


  {
    path: "/Ads_banner",
    name: "Ads",
    icon: "nc-icon nc-calendar-60",
    component: Ads_banner,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },

  {

    path: "/Verify_text",
    name: "Verify text",
    icon: "nc-icon nc-globe",
    component: TextApi,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },
  {
    path: "/tracking",
    name: "Url Tracking",
    icon: "nc-icon nc-single-copy-04",
    component: tracking,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },

 /*
  

  {
    path: "/validation",
    name: "BlogValidation",
    icon: "nc-icon nc-globe",
    component: Blogvalidation,
    layout: "/admin",
    Roles: ["Administrator","Content director"]
  },




  {

    path: "/CreateBlog",
    name: "Create Blog",
    icon: "nc-icon nc-globe",
    component: Blog,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },
  
  
  
  
  {

    path: "/Blog",
    name: "Blog",
    icon: "nc-icon nc-globe",
    component: yourBlog,
    layout: "/admin",
    Roles: ["Administrator","Content director","Freelancer"]
  },




  */

  

  {
    path: "/maps",
    name: "Info_web",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
    Roles: []
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    Roles: []
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    Roles: []
  },
  
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
    Roles: []
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
    Roles: []
  }

];
export default routes;
