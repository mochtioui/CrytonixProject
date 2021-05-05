/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Detail Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Fragment} from "react";
import serviceTheme from "../../services/theme.service";
import { Link} from "react-router-dom";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import servicePage from "../../services/page.service";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import {Button, Modal} from "react-bootstrap";


class RemovePage extends React.Component {


    constructor() {
        super();

    }
    removeClick = (page) => {

        servicePage.deletePage(page._id)
            .then((res) => {
                console.log(res)
                this.props.hide(page._id)
            })
    }

    handleClose = () => {
        this.props.hide()
    }

    render() {
        const { show, page } = this.props
        return (
            <Modal show={show}
                   size="md"
                   centered
                   onHide={ this.handleClose }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are sure you want remove this page ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ this.handleClose}>
                        Close
                    </Button>
                    <Button variant="info" onClick={ () => this.removeClick(page) }>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}


export default RemovePage;
