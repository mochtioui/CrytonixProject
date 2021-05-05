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
import React , {useEffect, useState} from "react";
import axios from "axios";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  ModalBody,
  Button,
  ModalFooter,
  Modal
} from "reactstrap";
import Ads_serv from "../services/Ads_banner/Ads_banner.service";



class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = { url_to_pdf: '' , url_to_html: '' , html:''  };
  }
  myChangeHandler = (event) => {
    this.setState({url_to_pdf: event.target.value});
  }
  myChangeHandler2 = (event) => {
    this.setState({url_to_html: event.target.value});
  }


  async getweb_html(e){

    var scraperapiClient = require('scraperapi-sdk')('5c3675bbf9261a7ed21b2d4191ef8fe0')
    var response = await scraperapiClient.get(e)
    console.log(response)
    alert (e)
    alert (response)
    this.html= response
    this.setState({
      html : response
    })
  }
  getweb_pdf(e){

    window.location.href = 'https://api.html2pdf.app/v1/generate?url='+e+'&apiKey=62db2d5b2e82fe35b0c2e6125111519041643b7acc5e7eafb39bdebad957a584'
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>WEB INFO </CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >

                    <form onSubmit={this.handleSubmit}>


                    <FormGroup>
                      <label>Website html </label>
                      <Input
                          placeholder="Type url page "
                          type="text"
                          name="name"
                          value={this.url_to_html}
                          onChange={this.myChangeHandler2}


                      />
                      <Button color="primary"   onClick={() =>this.getweb_html(this.state.url_to_html)} >Html</Button>{' '}
                    </FormGroup>

                    <CardHeader>{this.state.html}</CardHeader>
                    <br/><br/>
                    <FormGroup>
                      <label>website pdf form</label>
                      <Input
                          placeholder="Type url page to convert "

                          name="name"
                          type='text'
                          onChange={this.myChangeHandler}


                      />
                      <Button color="primary"  onClick={() =>this.getweb_pdf(this.state.url_to_pdf)} >pdf</Button>{' '}
                    </FormGroup>

                    </form>
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

export default Map;
