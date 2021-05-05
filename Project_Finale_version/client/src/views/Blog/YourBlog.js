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
import jwt_decode from "jwt-decode";
import loginn from "../../services/Login/Login";
import user from "../../services/User/user";
import blog from "../../services/Blog/Blog.js"
import EditBlog from "./EditBlog.js";
import Input from "reactstrap/es/Input";
import Asseign from "./AsseignBlog"
class YourBlog extends React.Component {


    constructor() {
        super();
        this.state = {
            blogs: [],
            userss: [],
            search: '',
            error: '',
            log:"",



        };
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        console.log(token);

        if (token != "") {
            console.log("d");

            this.setState({log: jwt_decode(token).users.role});
            console.log(jwt_decode(token).users._id);

            blog.yourblog(jwt_decode(token).users._id)
                .then(res => {
                    this.setState({
                        blogs: res
                    });
                });
        } else {
            this.setState({error: "you need to sign in"})
        }
console.log(this.state.blogs);
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
                                        <td><EditBlog typeId={blogs}/> <Asseign typeId={blogs} /></td>
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

export default YourBlog;
