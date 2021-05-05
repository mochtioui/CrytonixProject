
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
import AddProductSubType from "./AddProductSubType";
import UpdateProductSubType from "./UpdateProductSubType";
import TypeService from "../../services/product/ProductType.service";
import AssignToWebsite from "./AssignToWebsite";
import jwt_decode from "jwt-decode";

class productSubTypes extends React.Component {

  constructor() {
    super();
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    if(this.data != null )
    {
      this.etat=''
    }
    this.state = {
      subTypes: [],
      role:''

    };
  }


  componentDidMount() {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    const token = localStorage.getItem("token");
    this.setState({role: jwt_decode(token).users.role})
    SubTypeService.getAll()
        .then( res => {
          res.forEach((subtype,i) => {
            SubTypeService.checkExistence(this.data._id,subtype.productType._id,subtype._id)
                .then( r => {
                  subtype.exist =  r;
                  if (res.length -1  == i) {
                    this.setState({
                      subTypes : res
                    });
                  }


                })

          })

        })
  }
  refreshTable = () => {
    SubTypeService.getAll()
        .then( res => {
          this.setState({
            subTypes : res
          });
        });
    /*
   console.log(this.state.subTypes);
    console.log(subtype);
         this.setState({
            subTypes : this.state.subTypes.push(subtype)
          });
*/
  };
  deleteHandler(id) {
    SubTypeService.delete(id)
        .then( res => {
          this.setState({
            subTypes : this.state.subTypes.filter(t => t._id !== id)
          });
        })

  }
  addToWebsiteHandler(type) {
    SubTypeService.assignTypeToWebsite(type)
        .then( res => {
          console.log(res);
        })

  }
  render() {
    const { subTypes,role } = this.state ;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Product Sub-Types</CardTitle>
                  <AddProductSubType refreshTable={this.refreshTable}/>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Product Type</th>
                        <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>

                      {
                        subTypes.length ?
                            subTypes.map(subType => <tr key={subType._id}>

                              <td>{subType.name}</td><td>{subType.description}</td><td>{subType.productType.name}</td><td><div className="row">
                              {role == 'Administrator' ?
                                  <div className="row"> <UpdateProductSubType refreshTable={this.refreshTable} subTypeId={subType._id}/> {' '} <Button outline  color="danger" outline style={{ 'margin-left':"5px"}}  onClick={() =>this.deleteHandler(subType._id)} >Delete</Button>{' '}
                                  </div>  :null }
                              { subType.exist ?   <AssignToWebsite subtype={subType} refreshTable={this.refreshTable}  /> : null }
                              </div></td></tr>) :
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

export default productSubTypes;
