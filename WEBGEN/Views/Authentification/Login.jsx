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
import axios from "axios";
import "../../assets/css/page.css";
import {Link, Redirect} from "react-router-dom";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import './Login.css';
import loginn from "../../services/Login/Login.js"
class Login extends React.Component {
       state = {
           test: true,
            email:"",
            password:"",
           error:"",
        }
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleSubmit = event =>{
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        loginn.log(user)
            .then( res => {

                if(res.data.error!=null) {
                    console.log(res.data.error);
                    this.setState({error: res.data.error})
                }
                else{
                    console.log(res.data);
                    localStorage.setItem("token", res.data);
                    window.location.href = "http://localhost:3000/admin/dashboard";
                }
            })
    }
    componentDidMount() {


    }

    render() {
        const { types } = this.state ;
        return(
            <form className="login-form" onSubmit={this.handleSubmit}>
                <h1>
                    <span className="font-weight-bold"> */WebGen By.Crytonix </span>
                </h1>
                <h2 className="text-center">Welcome</h2>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email" required id="email" name="email" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" required placeholder="password" id="password" name="password" onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                <button type="submit" className="btn-lg btn-dark btn-block">Log in</button>
                <div className="alert-danger">
                    {this.state.error}
                </div>
            </form>

        );
    }
}

export default Login;
