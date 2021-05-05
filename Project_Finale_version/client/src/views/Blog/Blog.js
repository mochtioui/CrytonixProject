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
    Col, DropdownToggle, DropdownMenu, DropdownItem, Dropdown
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
import ReactHtmlParser from "react-html-parser";
import Blogservice from '../../services/Blog/Blog.js';
import blog from "../../services/Blog/Blog";
import Label from "reactstrap/es/Label";
class Blog extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            test:"",
            data2:{},
            check:null,
            Title:'',
            data: '<p>React is really <em>nice</em>!</p>',
            Image: null,
            test2: [] ,
            Blog: [],

            website:"",
            users:"",
            imagePreviewUrl: null,
        };

        this.handleChange = this.handleChange.bind( this );
        this.onEditorChange = this.onEditorChange.bind( this );
    }
    multiSelectHandler(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({Blog: value});
           console.log(this.state.Blog);
    }



    handleChangee(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
    ajoutblog = event => {

        const token = localStorage.getItem("token");
        let web =sessionStorage.getItem('webselect');
        this.state.test=JSON.parse(web);
        this.setState({users: jwt_decode(token).users._id});
        this.setState({website: this.state.test._id});
        this.state.data2 = {"Title": this.state.Title,
            "Blog":this.state.Blog,
            "Description":this.state.data,
            "Image":this.state.imagePreviewUrl,
            "website":this.state.website
            ,"users":this.state.users,
        };
        const fd = new FormData();
        fd.set('Title' , this.state.Title   );
        fd.set('Description' , this.state.data  );
        fd.append('file' , this.state.imagePreviewUrl );
        fd.set('website' , this.state.test._id );
        fd.set('users' , jwt_decode(token).users._id );
        fd.set('Blog' , this.state.Blog );

        Blogservice.register(fd).then(res => {

                alert("Blog added Successfully");


        })
    }
    upadateBlog(Description){
        this.setState({Description});


    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        blog.yourblog(jwt_decode(token).users._id)
            .then(res => {
                this.setState({
                    test2: res
                });
            });



    }

    test = () => {
        blog.Check(" suiss","fr")
            .then(res => {
                this.setState({
                    check: res
                });
                console.log('this.state.check');

                console.log(this.state.check.language);

            });
    }

    handleonchangeblog = (e, editor) => {
    }
    onEditorChange( evt ) {
        this.setState( {
            data: evt.editor.getData()
        } );
        console.log(this.state.data);
    }

    handleChange( changeEvent ) {
        this.setState( {
            data: changeEvent.target.value
        } );
    }
    handleImageChange = event => {
        this.setState( {imagePreviewUrl: event.target.files[0]});



    }
    render() {
        return(
            <div className="content">

                <form className="register-page" onSubmit={this.ajoutblog} >
                    <h1  >Your content </h1>


                    <FormGroup>
                        <label>Title  </label>
                        <Input
                            placeholder="Blog Title"
                            type="text"
                            name="Title"
                            required
                            onChange={this.handleChangee.bind(this)}


                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Image</label>
                        <div className="form_theme row">
                            <div className="col-md-5 ">
                                <div className=" input_file">
                                    <input  required type="file" className="form-control" accept=".png, .jpg, .jpeg" onChange={ this.handleImageChange } />


                                    <div className="file_preview">
                                        {

                                                <p className="input_text">Drag your files here or click in this area</p>

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </FormGroup>
                    <FormGroup>
                        <div className="App">
                            <CKEditor
                                data="<p>Hello froom CKEditor 4!</p>"
                                onChange={this.onEditorChange}
                            />
                        </div>

                    </FormGroup>
                    <button type="submit" className="btn-lg btn-dark btn-block"> save Blog </button>
                </form>
            </div>

        );
    }
}

export default Blog;
