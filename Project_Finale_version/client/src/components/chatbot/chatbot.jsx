/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
} from "reactstrap";

import routes from "routes.js";
import '../../assets/css/ads_front.css';
import ChatBot from 'react-simple-chatbot';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: '',
            age: '',
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { name, gender, age } = steps;

        this.setState({ name, gender, age });
    }

    render() {
        const { name, gender, age } = this.state;
        return (
            <div style={{ width: '100%' }}>
                <h3>Summary</h3>
                <table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{name.value}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{gender.value}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{age.value}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Review.propTypes = {
    steps: PropTypes.object,
};

Review.defaultProps = {
    steps: undefined,
};

class chatbot extends Component {
    render() {
        return (
            <ChatBot  width='30%' headerTitle=" Chatbot" bubbleStyle={{ fontSize: '11px' }} speechSynthesis={{ enable: false, lang: 'en', voice: null }}
                      inputStyle={{ fontSize: '11px' }} floating='true' bubbleOptionStyle={{fontSize: '13px' }}
                      steps={[
                    {
                        id: '1',
                        message: ' Hello , What is your name?',
                        trigger: 'name',
                    },
                    {
                        id: 'name',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}! What is your gender?',
                        trigger: 'gender',
                    },
                    {
                        id: 'gender',
                        options: [
                            { value: 'male', label: 'Male', trigger: '5' },
                            { value: 'female', label: 'Female', trigger: '5' },
                        ],
                    },
                    {
                        id: '5',
                        message: 'How old are you?',
                        trigger: 'age',
                    },
                    {
                        id: 'age',
                        user: true,
                        trigger: '7',
                        validator: (value) => {
                            if (isNaN(value)) {
                                return 'value must be a number';
                            } else if (value < 0) {
                                return 'value must be positive';
                            } else if (value > 120) {
                                return `${value}? Come on real age plz!`;
                            }

                            return true;
                        },
                    },
                    {
                        id: '7',
                        message: 'Great! Check out your summary',
                        trigger: 'review',
                    },
                    {
                        id: 'review',
                        component: <Review />,
                        asMessage: true,
                        trigger: 'update',
                    },
                    {
                        id: 'update',
                        message: 'Would you like to update some field?',
                        trigger: 'update-question',
                    },
                    {
                        id: 'update-question',
                        options: [
                            { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                            { value: 'no', label: 'No', trigger: 'end-message' },
                        ],
                    },
                    {
                        id: 'update-yes',
                        message: 'What field would you like to update?',
                        trigger: 'update-fields',
                    },
                    {
                        id: 'update-fields',
                        options: [
                            { value: 'name', label: 'Name', trigger: 'update-name' },
                            { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                            { value: 'age', label: 'Age', trigger: 'update-age' },
                        ],
                    },
                    {
                        id: 'update-name',
                        update: 'name',
                        trigger: '7',
                    },
                    {
                        id: 'update-gender',
                        update: 'gender',
                        trigger: '7',
                    },
                    {
                        id: 'update-age',
                        update: 'age',
                        trigger: '7',
                    },
                    {
                        id: 'end-message',
                        message: 'Thanks! Your data was submitted successfully!',
                        trigger: '8',
                    },
                    {
                        id: '8',
                        options: [
                            { value: 'Businessman', label: 'Businessman', trigger: '9' },
                            { value: 'Employee', label: 'Employee', trigger: '9' },
                            { value: 'Student', label: 'Student', trigger: '9' },
                        ],
                    },
                    {
                        id: '9',
                        component: (
                            <div> This is website can give u more information
                                <h1>click this link</h1><br/>
                                
                                <a href="http://localhost:3000/admin/dashboard"> Visit Support Link!</a>

                            </div>

                        ),
                        end: true,
                    },
                ]}
            />
        );
    }
}

export default chatbot;
