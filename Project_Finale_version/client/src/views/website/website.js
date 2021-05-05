import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import serviceSite from '../../services/website.service'
import servicePage from '../../services/page.service'
import Category from "../../theme/theme1/views/category";
import NavTools from "../../components/Navbars/NavTools";
import Ads from "../../components/Ads/Ads"
import Chatbots from "../../components/chatbot/chatbot";
import '../../assets/css/website.css';

import ChatBot from 'react-simple-chatbot';
import Header from "../../components/Navbars/DemoNavbar";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

class Website extends React.Component {

    constructor() {
        super();
        this.state = {
            website: '',
            pages: '',
            links: '',
            user: token && jwt_decode(token).users,

        }

    }

    componentDidMount() {
        serviceSite.webSite()
            .then( res => {
            this.setState({
                website : res,
                links: res.header?.links
            });
        })

       servicePage.getPage()
           .then( res => {
               this.setState({
                   pages : res
               });
           })
   }

    handleLinks = (links) => {
        this.setState({
            links: links
        })
    }

    loadHeader() {
        const Header = React.lazy(() => import('../../theme/' + this.state.website.theme.theme_name + '/components/header'))
        return <Header links = { this.state.links} logo = { this.state.website.logo_pic } pages = { this.state.pages } handle = { this.handleLinks } />
   }

    loadComponent(page) {
       const Componant =  React.lazy(() => import('../../theme/'+ page.website.theme.theme_name +'/views/'+page.layout.layout_name))
       return <Componant page={ page } editor = { true } website = { this.state.website } id={null}/>
   }

    render() {
        const { pages, website } = this.state

        const router = pages &&
            pages.map((page) =>
                page.layout.layout_name === 'detail' ?
                    <Route exact path={`${this.props.match.url}/` + page.SubTypePage.productTypePage.page_name + `/` + page.SubTypePage.page_name + `/` +page.page_name} render={ () => this.loadComponent(page)} key={page._id}/>
                    :
                    page.layout.layout_name === 'subcategory' ?
                        <Route exact path={`${this.props.match.url}/`+page.productTypePage.page_name + `/` +page.page_name} render={ () => this.loadComponent(page)} key={page._id}/>
                        :
                        page.layout.layout_name === 'BlogDetail' ?
                            <Route exact path={`${this.props.match.url}/` +page.page_name + '/:id'} render={ () => this.loadComponent(page)} key={page._id}/>
                            :
                        <Route exact path={`${this.props.match.url}/`+page.page_name} render={ () => this.loadComponent(page)} key={page._id}/>
            )


         return (

            <div className={ website.theme && 'wrapper wrapper-' + website.theme.theme_name }>
                {
                    (this.state.user.role === 'Administrator' || this.state.user.role === 'Content Editor') &&
                    <div className="header-top">
                        <div className="container">
                            <Link to="/admin/dashboard">Admin</Link>
                        </div>
                    </div>
                }
                <Suspense fallback={<div>Loading ...</div>}>
                    {  website.header && pages ? this.loadHeader(): ''}
                </Suspense>
                <div className="wrapper-content">
                    <Suspense fallback={<div>Loading ...</div>}>
                        { router }
                    </Suspense>
                </div>
                
            </div>
        );
    }

}

export default Website;
