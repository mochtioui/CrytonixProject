
import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col, Button
} from "reactstrap";

import SubTypeService from "../../services/product/ProductSubType.service";
import AddProductSubType from "../productSubType/AddProductSubType";
import UpdateProductSubType from "../productSubType/UpdateProductSubType";
import PropertyService from "../../services/product/ProductProperty.service";
import UpdateProductProperty from "./UpdateProductProperty";
import AddProductProperty from "./AddProductProperty";
import AssignToWebsite from "./AssignToWebsite";
import jwt_decode from "jwt-decode";
class productProperties extends React.Component {

  constructor(props) {
    super(props);
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);

    this.state = {
      properties: [],
      websiteId: '',
      countrycode: '',
      role:''
    };
  }


  componentDidMount() {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    const token = localStorage.getItem("token");
    this.setState({role: jwt_decode(token).users.role})
    if(this.data != null ) {
      console.log(this.data._id);
      this.setState({
        websiteId: this.data._id,
        countrycode: this.data.Contry,
      });}
    PropertyService.getAll()
        .then( res => {
          this.setState({
            properties : res
          });
        })
  }
  refreshTable = () => {
    PropertyService.getAll()
        .then( res => {
          this.setState({
            properties : res
          });
        });

  };
  deleteHandler(id) {
    PropertyService.delete(id)
        .then( res => {
          this.setState({
            properties : this.state.properties.filter(t => t._id !== id)
          });
        })

  }
  addToWebsiteHandler(type) {
    PropertyService.assignTypeToWebsite(type)
        .then( res => {
          console.log(res);
        })

  }
  render() {
    const { properties,websiteId,role } = this.state ;
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <div className="row">
                    <CardTitle tag="h4">Product Properties</CardTitle>
                      {["Administrator","Content director","Content coordinator"].includes(role) ?
                          <AddProductProperty refreshTable={this.refreshTable}/>
                          : null}

                      <AssignToWebsite websiteId={websiteId} refreshTable={this.refreshTable}/>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Product SubType</th>
                        {["Administrator","Content director","Content coordinator"].includes(role) ?
                            <th>Actions</th> :null}

                      </tr>
                      </thead>
                      <tbody>

                      {
                        properties.length ?
                            properties.map(property => <tr key={property._id}> <td>{property.name}</td><td>{property.description}</td><td>{property.type}</td>
                              <td><ul>{property.subType.length ? property.subType.map(subtype => <li> {subtype.name} </li> )  : null}</ul></td>
                              {["Administrator","Content director","Content coordinator"].includes(role) ?        <td>
                                <div className="row">
                                  <UpdateProductProperty refreshTable={this.refreshTable} propertyId={property._id}/> <Button color="danger" outline style={{ 'margin-left':"5px"}}  onClick={() =>this.deleteHandler(property._id)} >Delete</Button></div>
                              </td> : null}
                            </tr>) :
                            null
                      }





                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

        </>
    );
  }




}

export default productProperties;
