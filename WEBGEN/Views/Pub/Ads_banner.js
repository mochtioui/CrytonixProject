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
import Ads_serv from "../../services/Ads_banner/Ads_banner.service";
import web_serv from "../../services/website.service";
import AddAds_banner from "./AddAds_banner";
import UpdateAds_banner from "./UpdateAds_banner";
import SubTypeService from "../../services/product/ProductSubType.service";


class Ads_banner extends React.Component {
    Styleimage= ()=>{
        return{
        padding: '5px',
        width: '150px',
        }
    };
    delete_hidden=''
      border ='solid'
      banner_update =""
    Styleborder= (e)=>{

        if(e==this.banner_update  && this.delete_hidden==''){
            return {
                    border : this.border
                    }
        }
        else
        {
            return{
                     background :''  }

        }

        if(this.delete_hidden!=""){
            return  {
                border : this.delete_hidden
            }
        }
    };
    Stylesacane= (e)=>{
        if(e==true){ return{
            background :'#96F72A'

        }}
        else
        {return{
            background :'#F0234D'  }

        }
    };
    buttonstyle= (e)=>{
        return{
           "display":e
        }
    };

    button_ads_style= (e)=>{
        return{
            "display":e
        }
    };

     etat ='none';
     ads_etat='none'
     side_id ='';
     id_banner=' '


    constructor() {
        super();

        let data =sessionStorage.getItem('webselect');
        this.data = JSON.parse(data);
        let ads =null

        if(this.data != null )
        {
            this.etat=''
            this.side_id = this.data._id;
            this.banner_update = this.data.ads_banners;
            this.ads=this.data.ads_banners

        }
        if(this.ads!= null)
        {
            this.ads_etat=''
        }
        this.state = {
            ads_banner: [],

        };
    }


    async componentDidMount() {


/*
       var scraperapiClient = require('scraperapi-sdk')('5c3675bbf9261a7ed21b2d4191ef8fe0')
        var response = await scraperapiClient.get('http://esprit.tn/specialites/specialite-informatique/')
        console.log(response)
        alert (response) */

            fetch((  'https://api.html2pdf.app/v1/generate?url=https://www.leaders.com.tn/&apiKey=62db2d5b2e82fe35b0c2e6125111519041643b7acc5e7eafb39bdebad957a584'),{
                method: 'POST'
            });


        Ads_serv.getAll()
            .then(res => {
                this.setState({
                    ads_banner: res
                });
            })
    }
    refreshTable = () => {

        Ads_serv.getAll()
            .then( res => {
                this.setState({
                    ads_banner : res
                });
            });
        /*
       console.log(this.state.ads_banner);
        console.log(subtype);
        <img className="group list-group-image"
                                     src={require("assets/img/"+this.ads)}/>
             this.setState({
                ads_banner : this.state.ads_banner.push(subtype)
              });
    */
    };
    deleteHandler(id) {
        Ads_serv.delete(id)
            .then( res => {
                this.setState({
                    ads_banner : this.state.ads_banner.filter(t => t._id !== id)
                });
            })

    }


    delete_adsHandler(e) {
        alert(e)
        web_serv.delete_ads(e)
        this.delete_hidden='o'

        this.ads_etat='none'
        Ads_serv.getAll()
            .then( res => {
                this.setState({
                    ads_banner : res
                });
            });


    }

    addToWebsiteHandler(ads) {
        const data = {"ads_banners":ads._id } ;
        console.log(data);
        web_serv.update_ads(data,this.side_id)
        this.banner_update=  ads._id;
        this.delete_hidden=''
        this.ads_etat=''

        Ads_serv.getAll()
            .then( res => {
                this.setState({
                    ads_banner : res
                });
            });


    }

    render() {
        const { ads_banner } = this.state ;
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Ads_banners</CardTitle>
                                    <AddAds_banner refreshTable={this.refreshTable}/>
                                    <Button style={this.button_ads_style(this.ads_etat)} color="danger"  onClick={() =>this.delete_adsHandler(this.side_id)}>delete this website ads</Button>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Actions</th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            ads_banner.length ?
                                                ads_banner.map(ads_banner => <tr key={ads_banner._id}> <td style={this.Stylesacane(ads_banner.Valide_ads)}>{ads_banner.Ads_banner_name}</td><td style={this.Styleborder(ads_banner._id)}>{ads_banner.description}</td>
                                                    <td >

                                                    <img className="group list-group-image" style={this.Styleimage()}
                                                         src={require("assets/img/" + ads_banner.Ads_img)}/>
                                                    </td>
                                                    <td><div className="row"><UpdateAds_banner refreshTable={this.refreshTable} typeId={ads_banner._id}/> <Button color="danger"  onClick={() =>this.deleteHandler(ads_banner._id)} >Delete</Button><Button color="success"  style={this.buttonstyle(this.etat)} onClick={() =>this.addToWebsiteHandler(ads_banner)} >Add to website</Button></div></td></tr>) :
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

export default Ads_banner;
