import React, {Suspense} from 'react';

import '../css/Style.css';
import Header from "../components/header";
import  logo from './blog.jpg';
import '../css/BlogStyle.css';
import serviceBlog from "../../../services/Blog/Blog";
import Paginator from "../../../views/Blog/Paginator.js"
import {Link} from "react-router-dom";
class Blog extends React.Component {

    constructor() {
        super();
        this.state = {
            blogs: [],
            Description: "",
            website:'',
            loading: false,
            currentPage: 1,
            postsPerPage: 1,
        };
    }
    showmore = event => {
        this.state.currentPage = this.state.currentPage+1;
        console.log(  this.state.currentPage);
    }
    componentDidMount() {
        console.log("this.state.currentPage");
        console.log(this.state.currentPage);
        let web =sessionStorage.getItem('webselect');
        this.state.website=JSON.parse(web);
        this.setState({loading: true});
        serviceBlog.blogBywebsite(this.state.website._id)
            .then(res => {
                this.setState({
                    blogs: res,
                    loading:false
                });
            });
    }


    render() {

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        return (
            <div>

                <h3>Blog</h3>
                {
                    this.state.blogs.length ?
                        this.state.blogs.map(blog =>
                            <div>
                                <div id="container" >
                                    <div className="product-details">
                                        <a href="#">
                                            <h1>{blog.Title}</h1>
                                        </a>
                                        <p className="information">Vous ne pouvez pas déposer des billets et pièces dans chaque banque. Où est-ce possible, comment..
                                            <Link to={ {pathname: '/website/BlogDetail/'+blog._id} } className="navigation_page"> Lire plus </Link>

                                        </p>
                                        <div className="control">

                                        </div>
                                    </div>
                                    <div className="product-image">
                                        <a href="#">
                                            <img src={require("../../../assets/img/theme/"+blog.Image)} />
                                        </a>

                                    </div>

                                </div>


                            </div>


                        ) :
                        null}

            </div>
        );
    }
}


export default Blog;
