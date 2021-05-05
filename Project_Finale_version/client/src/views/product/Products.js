
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
import {Link} from "react-router-dom";
import SubTypeService from "../../services/product/ProductSubType.service";
import PropertyService from "../../services/product/ProductProperty.service";
import ProductService from "../../services/product/Product.service";
import TrackingService from "../../services/product/tracking.service";

import Image from "react-bootstrap/Image";
import {Redirect} from "react-router";
import jwt_decode from "jwt-decode";


class Products extends React.Component {

  constructor(props) {
    super(props);
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);

    this.state = {
      products: [],
      websiteId: '',
      countrycode: '',
      redirect: false,
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
      });
      ProductService.findByWebsite(this.data._id)
          .then(res => {
            this.setState({
              products: res
            });
          })
    }
  }
  refreshTable = () => {
    ProductService.findByWebsite(this.state.websiteId)
        .then( res => {
          this.setState({
            products : res
          });
        });

  };
  deleteHandler(id) {
    ProductService.removeFromWebsite(id,this.state.websiteId)
        .then( res => {
          this.setState({
            products : this.state.products.filter(t => t._id !== id)
          });
        })

  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/admin/product/add' />
    }
  }
  Redirect = (id) => {
    TrackingService.addBankClick(this.state.websiteId,id).then();
  }
  productClick = (id) => {
    TrackingService.productClick(this.state.websiteId,id).then();
  }
  activate =  (product) => {
    const p = {active:!product.active}
    ProductService.update(p,product._id).then()
    this.refreshTable();
  }
  sponsor =  (product) => {
    const p = {sponsored:!product.sponsored}
    ProductService.update(p,product._id).then()
    this.refreshTable();
  }
  render() {
    const { products,role } = this.state ;
    return (
        <>
          {this.renderRedirect()}
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <div className="row">
                      <div className="col-2">
                    <CardTitle tag="h4">Products </CardTitle>
                      </div>   <div className="col">
                    <Button color="primary" onClick={this.setRedirect} > Add  </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                 
                        {["Content director","Content coordinator"].includes(role) ?
                      <>  <th>Active</th>
                        <th> Sponsored</th></>
:null}
                        <th>Picture</th>
                        <th>Actions</th>

                      </tr>
                      </thead>
                      <tbody>

                      {
                        products.length ?
                            products.map(product =>{ const pic = 'http://localhost:3001/product/getPicture/'+product.picture; return(<tr key={product._id}> <td>{product.title}</td><td>{product.subType.name}</td>

                              {["Content director","Content coordinator"].includes(role) ?
                             <>     <td>
                                { product.active == true ?
                                  <Button color="danger" outline onClick={(e) => this.activate(product)}>deactivate</Button>
                                :  <Button color="success" outline onClick={(e) => this.activate(product)}  >activate</Button>
                                }
                              </td>
                              <td>
                                { product.sponsored == true ?
                                    <Button color="danger" outline onClick={(e) => this.sponsor(product)}>unsponsor</Button>
                                    :  <Button color="success" outline onClick={(e) => this.sponsor(product)}  >sponsor</Button>
                                }
                              </td> </> : null}

                              <td>    <img src={pic} style={{width: "50px",height:"50px"}}  /> </td>
                              <td><div className="row"><Button color="danger" outline style={{ 'margin-left':"5px"}}  onClick={() =>this.deleteHandler(product._id)} >Delete</Button></div></td></tr>)}) :
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

export default Products;
