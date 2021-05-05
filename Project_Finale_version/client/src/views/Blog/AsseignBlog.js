import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Label} from 'reactstrap';
import userService from "../../services/User/user.js";
import TypeService from "../../services/product/ProductType.service";
import CKEditor from "ckeditor4-react";
import Blogservice from "../../services/Blog/Blog.js";
import EditBlog from "./EditBlog";
import jwt_decode from "jwt-decode";
const AsseignBlog = (props) => {
    const {typeId} =props;
    const {userss} =props;
    const [modal, setModal] = useState(false);
    const [id, setid] = useState(" ");
    const [Image, setImage] = useState(" ");
    const [Blog, setBlog] = useState([]);
    const [test2, settest2] = useState( []);

    const [Statut, setStatut] = useState("");
    const [change, setchange] = useState("False");

    const toggle = () => setModal(!modal);
    const multiSelectHandler = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        console.log(value)
        setBlog({Blog: value});

        setBlog(value);
        console.log(Blog)
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        Blogservice.yourblog(jwt_decode(token).users._id)
            .then(res => {
                settest2(res)
            });
    },[typeId]);
    const submitHandlerr = (e) => {
        e.preventDefault();
        const data = {
            "Blog": Blog,

        };
console.log(data);
        console.log(Blog);
        const token = localStorage.getItem("token");

        Blogservice.AsseignBlog(typeId._id,data).then(res => {

            alert("Edit Successfully");
            toggle();



        });

    };
    return (
        <div>
            <Button color="success" onClick={toggle}>Asseign Blogs </Button>
            <Modal isOpen={modal} toggle={toggle}         size="xl">
                <ModalHeader toggle={toggle}>Asseign Blogs</ModalHeader>
                <ModalBody>
                    <form className="register-page"  onSubmit={submitHandlerr}>
                    <FormGroup >
                        <Label>Blogs</Label>
                        <select name="Blog"  multiple className="form-control" onChange={e => multiSelectHandler(e)}>
                            <option selected>Choose...</option>
                            {test2.map(test22 => <option value={test22._id}>{test22.Title}</option>)}
                        </select>


                    </FormGroup>
                    <button type="submit" className="btn-lg btn-dark btn-block"> ADD Blog </button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );

}
export default AsseignBlog;
