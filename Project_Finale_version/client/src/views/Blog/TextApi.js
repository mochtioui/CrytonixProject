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

import Blogservice from '../../services/Blog/Blog.js';
import blog from "../../services/Blog/Blog";
import Label from "reactstrap/es/Label";
import Blog from "./Blog";

class TextApi extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            error:[],
            check:[],
            text:'',
            check2:0,
            language:'',
            website:"5e975a214ed93f17e0581ff5",
            users:"5e93bd22ae5dd9223453d4f4",
            imagePreviewUrl: null,
        };


    }
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
    test = () => {
        console.log(this.state.text);

        blog.Check(this.state.text,this.state.language)
            .then(res => {
                this.setState({
                    check: res,
                    check2:1,
                });
                console.log(this.state.check.matches);
                this.state.error = this.state.check.matches;

                console.log(this.state.check.matches);



            });
    }
    render() {
        return(
            <div className="content">

                <form className="register-page" onSubmit={this.test} >

                <FormGroup>
                <h1>Choose Language</h1>
                <select name="language"   className="form-control" onChange={this.handleChange.bind(this)}>
                    <option selected>auto </option>
                    <option>en-US</option>
                    <option>de-DE</option>
                    <option>fr</option>
                </select>
                </FormGroup>
                <FormGroup>
                <h1  >Text </h1>
                    <textarea form ="testformid" name="text" id="text" cols="192"rows="20" wrap="soft" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
            </form>
                <button type="submit" className=" btn-dark "  onClick={this.test}>Verify Text</button>

                {
                    ( this.state.check2 === 1 ) &&
                     <p>

                         {
                             this.state.check.matches.map(site =>
                                 <p> <b>{site.rule.description+' : '}</b><br></br> <b style={{ color: 'red' }}>{site.context.text.substr(site.context.offset, site.context.length) +':  '} </b>{''+site.replacements.map(
                                     sites => sites.value+' '
                                 )}</p>
                             )
                         }

                     </p>
                }






            </div>
            )
    }
}
export default TextApi;
