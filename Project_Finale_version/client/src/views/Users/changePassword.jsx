import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col, Label} from 'reactstrap';
import userService from "../../services/User/user.js";
import TypeService from "../../services/product/ProductType.service";
const ChangePassword = (props) => {

    const {typeId} =props;
    const {userss} =props;
    const [modal, setModal] = useState(false);
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [error, seterror] = useState("");
    const [change, setchange] = useState("False");

    const toggle = () => setModal(!modal);
    const changee = () => {

        setchange("True");
        seterror("");

    }
    const submitHandlerr = (e) => {
        e.preventDefault();
        if(password === password2) {
            const data = {
                "password": password,

            };
            console.log(data);
            userService.changepassword(data, typeId)
                .then(res => {
                    console.log(res);
                    toggle();
                })
        }
        else{
            seterror("password don't match");
        }
    };
    return (
        <div>
            <Button color="danger" onClick={toggle}>Change Password </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit User</ModalHeader>
                <form onSubmit={submitHandlerr}>
                    <ModalBody>
                        <FormGroup>
                                <label>Password</label>
                                <Input
                                    placeholder="Type Password"
                                    type="password"
                                    name="username"
                                    onChange={e => setpassword(e.target.value)}

                                />
                                <label>Confirm Password</label>
                                <Input
                                    placeholder="Type Password"
                                    type="password"
                                    name="username"
                                    onChange={e => setpassword2(e.target.value)}

                                />
                            </FormGroup>




                        <div className="alert-danger">
                            {error}
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >Edit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default ChangePassword;
