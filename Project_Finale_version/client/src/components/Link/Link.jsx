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
/*eslint-disable*/
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col, DropdownToggle, DropdownMenu, DropdownItem, Dropdown
} from "reactstrap";
import serviceSite from "../../services/website.service";

class Link extends React.Component {

  constructor(props) {
    super(props);
  }

  addLinkClick = (page) => {
      const link = {
          link_text : page.page_name,
          page: page._id
      }

      serviceSite.linkSite(link,'add').then( res => {
          this.props.link(res)
      })
  }

  render() {
    const pages = this.props.pages ? (
        this.props.pages.filter(page => page.layout.layout_name !== 'subcategory' && page.layout.layout_name !== 'detail').map((page) =>
          <div className="menu-page_item" key={page._id} onClick={ () => this.addLinkClick(page)}>
              <p className="page-item_title">
                <span className="item-title_text">
                  { page.page_name }
                </span>
                <span className="item-title_toggle">
                  <i className="nc-icon nc-simple-add"></i>
                </span>
              </p>
          </div>
        )
    ) : ''

    return (
      <>
        <h5 className="nav-page_title">
          Pages
        </h5>
        <div className="menu_page">
          { pages }
        </div>
      </>
    );
  }
}

export default Link;
