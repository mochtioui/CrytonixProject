import React from "react";
import {
    UncontrolledAlert,
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Table
} from "reactstrap";
import EditorJs from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import Header from '@editorjs/editorjs';
import list from '@editorjs/editorjs';
import embed from '@editorjs/editorjs';
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import CKEditor from 'ckeditor4-react';
import jwt_decode from "jwt-decode";

import Blogservice from '../../services/Blog/Blog.js';
import Blog from "./Blog";
import EditBlog from "./EditBlog";
import blog from "../../services/Blog/Blog";
import EditBlogValidation from "./EditBlogValidation";
import Asseign from "./AsseignBlog";

class BlogValidation extends React.Component {


    constructor() {
        super();
        this.state = {
            blogs: [],
            search: '',

        };
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    componentDidMount() {
            blog.blog()
                .then(res => {
                    this.setState({
                        blogs: res
                    });
                });

    }
    render() {
        let Blogss = this.state.blogs.filter(
            (Blogs) => {
                return Blogs.Title.indexOf(this.state.search) !== -1;
            }
        );
        return(
            <div className="content">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Blogs</CardTitle>
                        <Input
                            placeholder="Search "
                            type="text"
                            name="search"
                            required
                            onChange={this.handleChange.bind(this)}

                        />
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead className="text-primary">
                            <tr>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Website</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.blogs.length ?
                                    Blogss.map(blogs =>
                                        <tr key={blogs._id}>
                                            <td>{blogs.Title}</td>

                                            <td>  <img src={require("assets/img/theme/"+blogs.Image)}    alt={"test"} style={{width: "200px",height:"200px"}}/> </td>
                                            <td>{blogs.website.site_name}</td>
                                            {blogs.Statut === "Activated" &&
                                            <td><Button color="success">{blogs.Statut}</Button></td>

                                            }
                                            {blogs.Statut === "desactivated" &&
                                            <td><Button color="danger">{blogs.Statut}</Button></td>

                                            }
                                            <td><EditBlogValidation typeId={blogs}/> </td>
                                        </tr>) :
                                    null
                            }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>

        );
    }

}
export default BlogValidation;
