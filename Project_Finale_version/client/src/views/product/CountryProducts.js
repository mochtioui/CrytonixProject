
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
import Image from "react-bootstrap/Image";
import {Redirect} from "react-router";
import TypeService from "../../services/product/ProductType.service";
import jwt_decode from "jwt-decode";


class CountryProducts extends React.Component {
  buttonstyle= (e)=>{
    return{
      "display":e
    }
  };
  etat ='none';
  constructor(props) {
    super(props);
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    if(this.data != null )
    {
      this.etat=''
    }
    this.state = {
      products: [],
      websiteId: '',
      countrycode: '',
        role: '',

        websiteProducts:[]
    };
  }


  componentDidMount() {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
      const token = localStorage.getItem("token");
      this.setState({role: jwt_decode(token).users.role})

    if(this.data != null ) {
      this.setState({
        websiteId: this.data._id,
        countrycode: this.data.Contry,
      });
      ProductService.findByWebsite(this.data._id)
          .then(res => {
            this.setState({
              websiteProducts: res
            });
            console.log(res);
          });
      ProductService.findByCountry(this.data.Contry)
          .then(res => {
            res.forEach((prod,i) => {
              ProductService.checkExistence(this.data._id,prod._id)
                  .then( r => {
                    prod.exist =  r;
                    if (res.length -1  == i) {
                      this.setState({
                        products: res
                      });
                    }


                  })

            })

          })
    }
  }
  refreshTable = () => {
    ProductService.findByCountry(this.data.Contry)
        .then( res => {
          this.setState({
            products : res
          });
        });

  };
  deleteHandler(id) {
    ProductService.delete(id)
        .then( res => {
          this.setState({
            products : this.state.products.filter(t => t._id !== id)
          });
        })

  }
  assignToWebsite(product) {
    ProductService.assignToWebsite(product,this.state.websiteId)
        .then( res => {
          this.refreshTable();
        })

  }
  render() {
    const { products,websiteProducts,role } = this.state ;
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Products </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>sub-Type</th>
                        <th>bank Link</th>
                        <th>Picture</th>
                        <th>Actions</th>

                      </tr>
                      </thead>
                      <tbody>

                      {
                        products.length ?
                            products.map(product =>{const pic = 'http://localhost:3001/product/getPicture/'+product.picture; return ( <tr key={product._id}> <td>{product.title}</td><td>{product.subType.name}</td><td>{product.bankLink}</td>
                              <td>    <img src={pic} style={{width: "50px",height:"50px"}}  /> </td>
                              <td><div className="row">
                                  {["Administrator","Content director","Content coordinator"].includes(role) ?       <Button outline style={{ 'marginLeft':"5px"}} color="danger"  onClick={() =>this.deleteHandler(product._id)} >Delete</Button> :null}
                                { product.exist ? null :    <Button color="success" outline style={{ 'marginLeft':"5px"}} onClick={() =>this.assignToWebsite(product)} >Add To Website</Button> }
                              </div>
                              </td>
                            </tr>)}
                            ) :
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

export default CountryProducts;
