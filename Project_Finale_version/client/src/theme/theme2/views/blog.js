import React, {Suspense} from 'react';
import '../css/Style.css';
import Header from "../components/header";
import '../css/Blogstyle.css';
import  logo from './profile.png';
import  logo2 from './unnamed.jpg'
import jwt_decode from "jwt-decode";
import blog from "../../../services/Blog/Blog";
import serviceBlog from "../../../services/Blog/Blog.js"
import ReactHtmlParser from "react-html-parser";

class Blog extends React.Component {

    constructor() {
        super();
        this.state = {
            blogs: [],
            Description: "",
            website:'',
        };
    }

    componentDidMount() {
        let web =sessionStorage.getItem('webselect');
        this.state.website=JSON.parse(web);
        console.log(this.state.website._id);
        serviceBlog.blogBywebsite(this.state.website._id)
            .then(res => {
                this.setState({
                    blogs: res
                });
            });
    }
    render() {
        return (
            <div class="content-wrapper">
                <div class="prod-d" >
                    <aside >
                        <h5 >NerdWallet's Best Credit Cards</h5>
                        <ul>
                            <li><a href="#">Best Credit Cards of 2019</a></li>
                            <li><a href="#">Best Rewards Credit Cards</a></li>
                            <li><a href="#">Best Cash Back Credit Cards</a></li>
                            <li><a href="#">Best Balance Transfer Cards</a></li>
                            <li><a href="#">Best Low Interest Credit Cards</a></li>
                        </ul>
                    </aside>
                    <aside >
                        <h5 >Shop & Compare Credit Cards</h5>
                        <ul>
                            <li><a href="#">All Credit Card Offers</a></li>
                            <li><a href="#">Rewards Credit Cards</a></li>
                            <li><a href="#">Cash Back Credit Cards</a></li>
                            <li><a href="#">Travel Credit Cards</a></li>
                            <li><a href="#">Balance Transfer Credit Cards</a></li>
                        </ul>
                    </aside><aside >
                    <h5 >More From NerdWallet</h5>
                    <ul>
                        <li><a href="#">Credit Cards</a></li>
                        <li><a href="#">Checking Accounts</a></li>
                        <li><a href="#">Savings Accounts</a></li>
                        <li><a href="#">CD Rates</a></li>
                        <li><a href="#">Mortgages</a></li>
                    </ul>
                </aside>
                </div>
                <div class="container">
                    <div class="Blog row nw-blog">
                        <section class="content-area col-md-8" role="main">
                            <div class="Test">
                                <h3>Blog</h3>
                            </div>
                            {
                                this.state.blogs.length ?
                                    this.state.blogs.map(blog =>
                                            <article>
                                                <header>
                                                    <div class="test2">

                                                        <span className="gauche"> <img src={require("../../../assets/img/theme/"+blog.Image)} height="160" width="160"/></span>

                                                        <h1> {blog.Title}</h1>

                                                    </div>
                                                </header>


                                                <span className="droite">

                 <div>

                      {ReactHtmlParser(blog.Description.substr(0,120)+' ... ')}</div><div
                                                    class="read-more"><a href={"/website/BlogDetail/"+blog._id}> <h3>Read more</h3></a></div>

                    </span>

                                            </article>
                                    ):
                                    null}
                        </section>
                    </div>

                </div>

            </div>

        );
    }
}

export default Blog;
