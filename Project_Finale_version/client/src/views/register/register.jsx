import React, { useState } from "react";
import {
    UncontrolledAlert,
    Alert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, ModalBody, ModalFooter, Modal
} from "reactstrap";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import loginn from "../../services/Login/Login.js";
import jwt_decode from "jwt-decode";
import registerr from "../../services/User/register.js";


class register extends React.Component {
    state = {
        error:"",
        errorr:"",
        sites:[],
        log:"",
        username:"",
        email:"",
        password:"",
        password2:"",
        role:"Choose...",
        website:[],
        function:"",
        data:{},
    }
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
     multiSelectHandler(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
         this.setState({website: value});
         console.log(this.state.website);

    }
    handleSubmit = event => {
        if(this.state.password===this.state.password2) {
            console.log("aaaa");
            console.log(this.state.website);

            const token = localStorage.getItem("token");

            if(this.state.website===""&&this.state.function==="") {
                 this.state.data = {"username": this.state.username,"email":this.state.email,"password":this.state.password, "role":this.state.role,"token":token};
            }
            else if(this.state.website!==""&&this.state.function===""){
                this.state.data = {"username": this.state.username,"email":this.state.email,"password":this.state.password, "role":this.state.role,"website":this.state.website, "token":token};
            }
            else if (this.state.website!==""&&this.state.function!==""){
                console.log(this.state.function);
                this.state.data = {"username": this.state.username,"email":this.state.email,"password":this.state.password, "role":this.state.role,"website":this.state.website,"function":this.state.function, "token":token};
            }
            console.log(this.state.data);

            registerr.register(this.state.data).then(res => {
                if(res.data.error!=null){
                    console.log(res.data.error);
                    this.setState({errorr: res.data.error});

                }
                else{
                    alert("User added Successfully");

                }
            })
        }
        else{
            this.setState({errorr: "password don't match"});

        }

    };




    componentDidMount() {
        const token = localStorage.getItem("token");
        if(token != "") {
            this.setState({log: jwt_decode(token).users.role})
            loginn.getAll()
                .then(res => {

                    this.setState({
                        sites: res
                    });
                })

        }
        else{
            this.setState({error: "you need to sign in"})

        }

    }



    render() {
        const {sites} = this.state;
        if (this.state.error != "") {
      return(
                <div className="content">
                    <div className="alert-danger">
                        <h1>You need to sign in</h1>
                    </div>
                </div>)
            }
        else {
            if (this.state.log === "Administrator") {
                return (

                    <div className="content">
                        <form className="register-page" onSubmit={this.handleSubmit} >
                                <FormGroup>
                                    <label>User Name </label>
                                    <Input
                                        placeholder="Type user name"
                                        type="text"
                                        name="username"
                                        required
                                        onChange={this.handleChange.bind(this)}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Email</label>
                                    <Input
                                        placeholder="Type Email"
                                        type="text"
                                        name="email"
                                        required
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <label>Password</label>
                                    <Input
                                        placeholder="Type Password"
                                        required
                                        type="password"
                                        name="password"

                                        onChange={this.handleChange.bind(this)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Confirm Password</label>
                                    <Input
                                        placeholder="Type Password"
                                        required
                                        type="password"
                                        name="password2"
                                        onChange={this.handleChange.bind(this)}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>role</Label>
                                    <select name="role"   className="form-control"   onChange={this.handleChange.bind(this)}>
                                        <option selected>Choose...</option>
                                        <option>Content director</option>
                                        <option>Administrator</option>
                                        <option>Sales manager</option>
                                        <option>Content coordinator</option>
                                        <option>Freelancer</option>
                                        <option>Content Editor</option>
                                    </select>
                                </FormGroup>
                            {
                                (this.state.role !== "Administrator" && this.state.role !== "Content director" && this.state.role !== "Choose..." )&&
                                <FormGroup>
                                <Label>site</Label>
                                <select name="website"  multiple className="form-control" onChange={e => this.multiSelectHandler(e)}>
                                <option selected>Choose...</option>
                                {sites.map(site => <option value={site._id}>{site.site_name}</option>)}
                                </select>


                                </FormGroup>}
                            {
                                (this.state.role === "Freelancer" || this.state.role === "Content Editor")&&
                                <FormGroup>
                                <Label>function</Label>
                                <select name="function"  className="form-control" onChange={this.handleChange.bind(this)}>
                                <option selected>Choose...</option>
                                <option>Blog  Editor</option>
                                <option>Product Page Editor</option>
                                </select>
                                </FormGroup>

                            }


                                <div className="alert-danger">
                                    {this.state.errorr}
                                </div>

                                <div className="alert-primary">
                                </div>

                                <Button color="primary" type="submit" >Add</Button>
                        </form>
                    </div>
                )
            } else {
                return (
                    <div className="content">
                    <div className="alert-danger">
                        <h1>You need to be Administrator</h1>
                    </div>
                </div>
                )
            }
        }
        }


}
export default register;
