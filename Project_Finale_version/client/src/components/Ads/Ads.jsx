/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input, Button
} from "reactstrap";

import routes from "routes.js";
import '../../assets/css/ads_front.css';
import '../../assets/css/ads _theme1.css';
import propTypes from 'prop-types';
import Web_serv from "../../services/website.service";
import Ads_serv from "../../services/Ads_banner/Ads_banner.service";

class Ads extends React.Component {
    adsstyle= (e)=>{
        if( e === "5e6e2d5dbb31d31ed84c002e")
         return{
             'visibility': 'hidden'
        }
        if( this.ads==='loading.png')
            return{
                'visibility': 'hidden'
            }

    };
    ads2style= (e)=>{
        if( e === '5e6e2d4fbb31d31ed84c002d')
            return{
                'visibility': 'hidden'
            }
        if( this.ads==='loading.png')
            return{
                'visibility': 'hidden'
            }
    };
    Styleimage= ()=>{
        return{
            padding: '5px',
            width: '180px',
            height: '250px',

        }
    };
    ads='loading.png'
    etat_add=''
    theme=''
    etat=''
    ads_desc=''
    ads_name=''
    constructor() {
        super();
        let data =sessionStorage.getItem('webselect');
        this.data = JSON.parse(data);

        if(this.data != null )
        {
            this.etat=''
            this.web= this.data._id;
            this.theme=this.data.theme ;
           // alert(this.theme)


        }

        this.state = {
            website: {},
            ads_banner:{}


        };
    }
    buttonstyle= (e)=>{
        return{
            "display":e
        }
    };

    etat ='none';

    componentDidMount() {

        Web_serv.getOneById(this.web)
            .then( res => {

                this.setState({
                    website : res
                }
                );
                if(this.state.website.ads_banners != null){ this.ads= this.state.website.ads_banners.Ads_img;
                    this.ads_desc= this.state.website.ads_banners.description;
                    this.etat_add= this.state.website.ads_banners.Valide_ads;
                    this.ads_name = this.state.website.ads_banners.Ads_banner_name;
                }



            })



    }

    deleteHandler(){

        alert(this.web)
        alert( "aa"+this.state.website.ads_banners._id)
        alert( "aa"+this.ads)

    }

    render() {
        if(this.etat_add !== false){this.etat=''}
        return (

            <html xmlns="http://www.w3.org/1999/xhtml"  lang="en">
            <head>
                <meta http-equiv="content-type" content="text/html; charset=utf-8" />
                <link href='https://fonts.googleapis.com/css?family=Satisfy|Roboto+Slab:400,700' rel='stylesheet' type='text/css'/>
            </head>
            <body style={this.adsstyle(this.theme)} >
            <div id="container-popup">
                <div className="popup"> <p className="pheader">{this.ads_name}</p><a className="close"
                                                                                                     title="Close"
                                                                                                     href="#container-popup">×</a>
                    <img id="product"  src={require("assets/img/"+this.ads)}/>
<br/><br/>
                    <p className="pbody"> {this.ads_desc} </p>
                    </div>
            </div>




            </body>

            </html>


        );
    }
}

export default Ads;
