import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Label} from 'reactstrap';
import userService from "../../services/User/user.js";
import TypeService from "../../services/product/ProductType.service";
import CKEditor from "ckeditor4-react";
import Blogservice from "../../services/Blog/Blog.js";

const EditBlogValidation = (props) => {

    const {typeId} =props;
    const {userss} =props;
    const [modal, setModal] = useState(false);
    const [Title, setTitle] = useState(" ");
    const [Image, setImage] = useState(" ");
    const [Description, setDescription] = useState([]);
    const [error, seterror] = useState("");

    const [Statut, setStatut] = useState("");
    const [change, setchange] = useState("False");

    const toggle = () => setModal(!modal);
    const handleImageChange = (e) => {
        setImage( {Image: e.target.files[0]});
        console.log(Image);
    }
    useEffect(() => {
        setTitle(typeId.Title);
        setImage(typeId.Image);
        setDescription(typeId.Description);
        console.log(Title+Image+Description);

    },[typeId]);
    const onEditorChange = (e) =>{
        setDescription(e.editor.getData());
    }
    const submitHandlerr = (e) => {
        e.preventDefault();
        const data = {
            "Title": Title,
            "Description": Description,
            "Image":Image.split(/(\\|\/)/g).pop(),
        "Statut": Statut
        };

        console.log(data);
        console.log(typeId._id);
        Blogservice.EditBlogValidation(data,typeId._id).then(res => {

            alert("Edit Successfully");


        });

    };
    return (
        <div>
            <Button color="warning" onClick={toggle}>Edit </Button>
            <Modal isOpen={modal} toggle={toggle}         size="xl">
                <ModalHeader toggle={toggle}>Edit Blog</ModalHeader>
                <ModalBody>
                    <form className="register-page"  onSubmit={submitHandlerr}>
                        <FormGroup>
                            <Label>Statut</Label>
                            {typeId.Statut === "activated" &&
                            <select required name="Statut"  onChange={e => setStatut(e.target.value)}
                                    className="form-control">
                                <option selected>{typeId.Statut}</option>
                                <option>desactivated</option>
                            </select>
                            }
                            {typeId.Statut  === "desactivated" &&
                            <select required name="Statut"  onChange={e => setStatut(e.target.value)}
                                    className="form-control">
                                <option selected>{typeId.Statut}</option>
                                <option>activated</option>
                            </select>
                            }
                        </FormGroup>
                        <FormGroup>
                            <label>Title  </label>
                            <Input
                                type="text"
                                value={Title}
                                onChange={e => setTitle(e.target.value)}

                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Image</label>
                            <div className="form_theme row">
                                <div className="col-md-5 ">
                                    <div className=" input_file">
                                        <input   type="file" className="form-control" accept=".png, .jpg, .jpeg" onChange={e => setImage(e.target.value)}  />


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
                                <h2>Edit Blog Description</h2>
                                <CKEditor
                                    data={typeId.Description}
                                    onChange={onEditorChange}

                                />
                            </div>

                        </FormGroup>

                        <button type="submit" className="btn-lg btn-dark btn-block"> save Blog </button>

                    </form>

                </ModalBody>
            </Modal>
        </div>
    );

}
export default EditBlogValidation;
