/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import register from "../../services/User/register.js";
import TypeService from "../../services/product/ProductType.service";

const Register1 = () => {

    const [modal, setModal] = useState(false);
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [password2, setpassword2] = useState("");
    const [role, setrole] = useState("");
    const [error, seterror] = useState("");
    const [succes, setsucces] = useState("");

    const toggle = () => setModal(!modal);
    const changeHandler = (e) => {
        e.target.name = e.target.value;
    };
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(password);
        console.log(password2);
        if(password===password2) {
            const token = localStorage.getItem("token");
            const data = {"username": username,"email": email, "password": password, "role": role, "token": token};
            register.register(data).then(res => {
                if(res.data.error!=null){
                    seterror(res.data.error);
                }
                else{
                    console.log(res);
                    setsucces('User add succes');
                }
            })
        }
        else{
            seterror('password dont match');

            console.log(error);
        }

    };


    return (
        <div>
            <Button color="primary" onClick={toggle}>Add new Administrator/Content director</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new user</ModalHeader>
                <form onSubmit={submitHandler} >
                    <ModalBody>
                        <FormGroup>
                            <label>User Name </label>
                            <Input
                                placeholder="Type user name"
                                type="text"
                                name="username"
                                value={username}
                                onChange={e => setusername(e.target.value)}

                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Email </label>
                            <Input
                                placeholder="Type Email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={e => setemail(e.target.value)}

                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Password</label>
                            <Input
                                placeholder="Type Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setpassword(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Confirm Password</label>
                            <Input
                                placeholder="Type Password"
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={e => setpassword2(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Role</label>
                            <select name="role" value={role}  onChange={e => setrole(e.target.value)}  className="form-control">
                                <option selected>Choose...</option>
                                <option>Content director</option>
                                <option>Administrator</option>
                            </select>
                        </FormGroup>
                        <div className="alert-danger">
                            {error}
                        </div>
                        <div className="alert-primary">
                            {succes}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >Add</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default Register1;
