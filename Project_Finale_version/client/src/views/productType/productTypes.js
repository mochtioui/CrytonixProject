
import React from "react";
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
import TypeService from "../../services/product/ProductType.service";
import AddProductType from "./AddProductType";
import UpdateProductType from "./UpdateProductType";
import AssignToWebsite from "./AssignToWebsite";
import SubTypeService from "../../services/product/ProductSubType.service";
import jwt_decode from "jwt-decode";

class productTypes extends React.Component {




  constructor() {
    super();

    this.state = {
      types: [],
      website:{},
      websiteId:'',
      role:''
    };
  }


  componentDidMount() {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    const token = localStorage.getItem("token");
    this.setState({role: jwt_decode(token).users.role})
    if(this.data != null )
    {


    this.state = {
      website:this.data,
      websiteId:this.data._id
    };}
    console.log(jwt_decode(token).users.role);
    TypeService.getAll()
        .then( res => {
          res.forEach((type,i) => {
            TypeService.checkExistence(this.data._id,type._id)
                .then( r => {
                  type.exist =  r;
                  if (res.length -1  == i) {
                    this.setState({
                      types : res,

                    });
                  }


                })

          })

        })
  }
  deleteHandler(id) {
    TypeService.delete(id)
        .then( res => {
          this.setState({
            types : this.state.types.filter(t => t._id !== id)
          });
        })

  }
  refreshTable = () => {

    TypeService.getAll()
        .then( res => {
          this.setState({
            types : res,
          });
        })

  };
  checkExistence = (typeId) => {
    let data =sessionStorage.getItem('webselect');
    this.data = JSON.parse(data);
    TypeService.checkExistence(this.data._id,typeId)
        .then( res => {
     //    console.log(res)
      //   console.log(typeId)

          return res ;
        })

  };
  render() {
    const { types,website,role } = this.state ;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Product Types</CardTitle>
                  <AddProductType refreshTable={this.refreshTable}/>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>

                      {
                        types.length ?
                            types.map(type => <tr key={type._id}>
                              <td>{type.name}</td><td>{type.description}</td>
                              <td><div className="row">
                                {["Administrator","Content director","Content coordinator"].includes(role) ?
                              <div className="row">  <UpdateProductType typeId={type._id} /> <Button outline style={{ 'margin-left':"5px"}} color="danger"  onClick={() =>this.deleteHandler(type._id)} >Delete</Button>
                              </div>  :null }
                                { type.exist ? null : <AssignToWebsite type={type} typeId={type._id} websiteId={this.state.websiteId}   website={website}   /> }
                              </div></td>
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

export default productTypes;
