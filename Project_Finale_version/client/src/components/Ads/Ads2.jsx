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
import propTypes from 'prop-types';
import Web_serv from "../../services/website.service";
import Ads_serv from "../../services/Ads_banner/Ads_banner.service";

class Ads2 extends React.Component {
    adsstyle= (e)=>{

        if( this.ads==='loading.png')
            return{
                'visibility': 'hidden',

                'display': 'none'
            }

    };
    ads2style= (e)=>{

        if( this.ads==='loading.png')
            return{
                'visibility': 'hidden' ,

                'display': 'none'
            }
    };

    ads='loading.png'
    etat_add=''
    theme=''
    etat=''
    ads_desc=''
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
                    this.etat_add= this.state.website.ads_banners.Valide_ads;}



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

            <body  style={this.ads2style(this.theme)}>
            <div id="banner-ad" className="world-2018-ad" >
                <div className="inner-content">
                    <div className="line-decoration left-top blue">
                        <span className="line-group"></span>
                        <span className="line-group"></span>
                        <span className="line-group"></span>
                    </div>
                    <div className="line-decoration left-bottom green">
                        <span className="line-group"></span>
                        <span className="line-group"></span>
                        <span className="line-group"></span>
                    </div>
                    <img className="logo"
                         src={require("assets/img/"+this.ads)}/>
                    <span className="line-divider red"></span>
                    <div className="ad-copy">
                        <span id="ctl00_GlobalTopAd_WorldTopAd"><h5 className="no-spacing margin-bottom-5">{this.ads_desc}</h5></span>
                    </div>
                    <a href="http://events.microstrategy.com/d/55qvr2?ct=ca5f1ca8-04ae-4624-a9ae-830aee2d3b03&RefID=commPromo"
                       target="_blank" className="button red tiny arrow"
                       data-eventlabel="sitewide-world2018-091117-global">Learn more</a>
                    <div className="line-decoration right orange">
                        <span className="line-group"></span>
                        <span className="line-group"></span>
                        <span className="line-group"></span>
                    </div>

                </div>

            </div>
            <br/><br/><br/> <br/>

            </body>



            </html>


        );
    }
}

export default Ads2;
