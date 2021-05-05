import React, {Suspense} from 'react';
import '../css/Style.css';
import Header from "../components/header";
import  logo from './blog.jpg';
import  logo2 from './profile.png'

import '../css/BlogStyle.css';
import serviceBlog from "../../../services/Blog/Blog";
import Paginator from "../../../views/Blog/Paginator.js"
import ReactHtmlParser from "react-html-parser";
import {Link} from "react-router-dom";
class BlogDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            test: [],
            Blog:[] ,
            Description: "",
            website:'',
        };
    }
    componentDidMount() {
        const a = window.location.pathname;
        const id = serviceBlog.IdBlog(a);
        serviceBlog.BlogDetail(id)
            .then(res => {
                this.setState({
                    test: res

                });
            });
    }


    render() {
        return (
            <div>



                <div className="News">
                    <strong className="newss"> News</strong>
                    <hr className="hr-comment margin-top-25-"></hr>
                    {

                        this.state.test.length ?
                            this.state.test.map(testt =>
                                testt.Blog.map(testtt =>
                                        < Link to={ {pathname: '/website/BlogDetail/'+testtt._id} }><p
                            className="rightBlog"><span className="darkblue-color">»&nbsp;</span>
                            <strong>{testtt.Title}</strong></p></Link>
                                )

                            ):null

                    }
                </div>



                {

                    this.state.test.length ?
                        this.state.test.map(testt =>

                <div className="col-xs-2 col-md-7 Blog-content"  >
                    <div className="navsq">
                        <a className="navigations" href="/website/home"><strong>Home > </strong></a>
                      <a className="navigations"href="/website/Blog"><strong>Blog > </strong></a>
                   <a className="navigations"href="/website/Blog"><strong>{testt.Title}  </strong></a>
                    </div>

                            <div className="image">
                    <img src={require("../../../assets/img/theme/"+testt.Image)} width="617px" height="347px"/>
                    <p className="Title">{testt.Title}</p>
                            </div>
                    <div className="auteur">
                      <a href="#">
                      <img className="img-avatar" src={logo2}/>
                      </a>
                        <div className="flex blogcontent">
                            <p className="avatar-name">{testt.users.username}</p>
                            <p className="avatar-name">21/04/2020</p>

                        </div>
                    </div>
                    <div className="contenue">
                        <p>
                            {ReactHtmlParser(testt.Description)}

                        </p>
                    </div>

                </div>
                        ):null


                }
            </div>

        )
    }

}
export default BlogDetail;
