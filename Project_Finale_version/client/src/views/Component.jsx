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
import "../assets/css/page.css";
import Link from "../components/Link/Link";
import serviceSite from "../services/website.service";
import servicePage from "../services/page.service";


class Pages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      links : props.website.header?.links,
      toggle_add: false,
      pages : ''
    }
  }

  componentDidMount() {
    servicePage.getPage()
        .then(res =>
            this.setState({
                pages: res
            })
        )
  }

  handleLink = (link) => {
    this.setState({
      links : [...this.state.links, link]
    })
  }

  editLinkClick = (link_id,index) => {

    const link_text = this.refs[`link_text` + index ].value
    const page = this.refs[`page` + index].value

    if (link_text !== '' && page.value !== '') {
      const link = {
        link_text: link_text,
        page: page,
        _id: link_id
      }

      serviceSite.linkSite(link, 'edit').then(res => {
        const links = [...this.state.links]
        links[index] = res
        this.setState({
          links: links
        })

      })

    }

  }

  deleteLinkClick = (link, index) => {

    serviceSite.linkSite(link,'remove')
        .then(
            this.setState({
              links: this.state.links.filter((link,i) => i !== index)
            })
        )
  }

  addClick = () => {
    this.setState({
      toggle_add: !this.state.toggle_add
    })
  }

  render() {

    const pages = this.state.pages ? (
        this.state.pages.filter(page => page.layout.layout_name !== 'subcategory' && page.layout.layout_name !== 'detail').map(page =>
           <option key={page._id} value={page._id}> { page.page_name} </option>
        )
    ) : ''

    console.log( this.state.links )

    const links = this.state.links ?
        this.state.links.map((link,index) =>
            <div className="menu-link_item" key={link._id}>
              <p className="link-item_title" data-toggle="collapse" data-parent="#menu_link" href={'#collapse'+index}>
                <span className="item-title_text">{ link.link_text }</span>
                <span className="item-title_toggle">
                  <span className="toggle_text">{ link.page.page_name}</span>
                  <i className="nc-icon nc-minimal-down"></i>
                </span>
              </p>
              <div id={'collapse'+index} className="panel-collapse collapse">
                <div className="link-item_body">
                  <form>
                    <div className="form-group">
                      <input type="text" ref={ 'link_text' + index} className='form-control' placeholder="Link text"
                             defaultValue={ link.link_text }  />
                    </div>
                    <div className="form-group">
                      <select ref={ 'page' + index} className='form-control' defaultValue={link.page._id}>
                        { pages }
                      </select>
                    </div>
                    <span className="btn btn-primary col-12" onClick={ () => this.editLinkClick(link._id,index) }>Save</span>
                    <span className="btn btn-danger col-12"  onClick={ () => this.deleteLinkClick(link,index) }>Delete</span>
                  </form>
                </div>
              </div>
            </div>

        ) : ''


    return (
      <>

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#header">Header</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#footer">Footer</a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div id="header" className="container tab-pane active">
                       <Row>
                         <div className="col-md-5 nav_link">
                           <div className="container">
                             <h5 className="nav-link_title">
                               Links
                             </h5>
                             <div className="menu_link" id="menu_link">
                               { links }
                             </div>
                             <div className="link-btn_add">
                               <button className="btn btn-info" onClick={ () => this.addClick() }>
                                     <i className= { this.state.toggle_add ? "nc-icon nc-simple-remove" : "nc-icon nc-simple-add"}></i>
                                     &nbsp;Add link
                               </button>
                             </div>
                           </div>
                         </div>
                         <div className="col-md-5 offset-md-1 add_link">
                           { this.state.toggle_add ?
                               <Link pages={ this.state.pages } link = { this.handleLink } /> : ''
                           }
                         </div>
                       </Row>
                      </div>
                      <div id="footer" className="container tab-pane fade">
                      </div>
                    </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Pages;
