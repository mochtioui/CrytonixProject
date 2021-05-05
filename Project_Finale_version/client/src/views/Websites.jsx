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
import axios from "axios";
import { Link} from "react-router-dom";
import propTypes from 'prop-types';
import '../assets/css/WebsiteListe.css';
import '../assets/scss/websiteListe.js';


// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Container ,Row, Col } from "reactstrap";

class Websites extends React.Component {
StyleLink= ()=>{
        return{
            backgroundColor : 'bleu' ,
            color : 'white',
            textAlign :'center'


        }
    };
  state = {websites: []}
    clicke= (website) => {
      this.setState({
        website : website
      })
    }

//Cycle de vie 
 componentDidMount() {

    fetch('http://localhost:3001/website')
      .then(res => res.json())
      .then(websites => this.setState({ websites }));
  }

deleteRow  ( web_id){

      const id = web_id
      ;

    const url = "http://localhost:3001/website/" + id;

   fetch(url, {
   			method: 'DELETE'
   		});
}

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="demo-icons">
                <CardHeader>
                  <CardTitle tag="h5">Websites</CardTitle>

                </CardHeader>
                <CardBody className="all-icons">
                  <div id="icons-wrapper">




  <section>
                                <div className="App">
                                <button type="submit" class="btn-round btn btn-primary"> <Link style={this.StyleLink()} to='/Website_add'>add website</Link> </button>

                                <div class="container">
                                    <div class="well well-sm">
                                            <strong>Display</strong>
                                            <div class="btn-group">
                                                <a href="#" id="list" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-th-list">
                                                </span>List</a> <a href="#" id="grid" class="btn btn-default btn-sm"><span
                                                    class="glyphicon glyphicon-th"></span>Grid</a>
                                            </div>
                                        </div>


                                     <h1>Sitewebs</h1>
                                                                      {this.state.websites.map(Website =>
                                                                      <Container>
                                                                        <Row>

                                                                          <Col>
                                                                        <div className="page-list_item" key={Website.id} >
                                                                         <div id="products" class="row list-group">
                                                                                                                <div class="item  col-xs-4 col-lg-4">
                                                                                                                    <div >
                                                                                                                        <img class="group list-group-image"  src={require("assets/img/"+Website.logo_pic)} />

                                                                                                                        <div class="caption">
                                                                                                                            <h5 class="group inner list-group-item-heading">
                                                                                                                                website name : {Website.site_name} </h5>
                                                                                                                            <p class="group inner list-group-item-text">
                                                                                                                                Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                                                                                                                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                                                                                                                            <div class="row">
                                                                                                                                <div class="col-xs-12 col-md-6">
                                                                                                                                    <p class="lead">
                                                                                                                                     Country   {Website.Contry}</p>
                                                                                                                                </div>


                                                                                                                                     <div className="dropdowne item-dropdown" onClick={ () => this.clicke(Website)}>
                                                                                                                                                               <span className="item-btn_setting" data-toggle="dropdown" data-toggle-second="tooltip" title="Setting">
                                                                                                                                                                 <i className="nc-icon nc-settings-gear-65"></i>
                                                                                                                                                               </span>
                                                                                                                                                  <div className="dropdown-menu dropdown-menu-right">
                                                                                                                                                    <Link className="dropdown-item" to={'/block-editor/' + Website._id } >

                                                                                                                                                      Edit
                                                                                                                                                    </Link>
                                                                                                                                                    <a className="dropdown-item" >

                                                                                                                                                      Rename
                                                                                                                                                    </a>
                                                                                                                                                    <div className="dropdown-divider"></div>
                                                                                                                                                    <a  onClick={() => this.deleteRow(Website._id)} className="dropdown-item" href="#">

                                                                                                                                                      Remove
                                                                                                                                                    </a>
                                                                                                                                                  </div>
                                                                                                                                                </div>

                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                         </div>



 </Col>    </Row>
  </Container>
                                                                      )}
                                                                      </div>







                                </div>







                    </section>
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

export default Websites;
