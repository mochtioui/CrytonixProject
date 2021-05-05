/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import PropertyService from "../../services/product/ProductProperty.service";
import Label from "reactstrap/es/Label";

const UpdateProductProperty = (props) => {

    const {propertyId} =props;
    const [modal, setModal] = useState(false);
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [subTypes, setSubTypes] = useState([]);
    const [newSubTypes, setNewSubTypes] = useState([]);
    const [type, setType] = useState("");
    const toggle = () => setModal(!modal);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {name:name,description:description,type:type,subType:newSubTypes};
        console.log(data);
        PropertyService.update(data,propertyId)
            .then( res => {
                props.refreshTable();
                toggle();
            })
    };
    useEffect(() => {
        PropertyService.getOneById(propertyId)
            .then( res => {
                setName(res.name);
                setDescription(res.description);
                setType(res.type);
                setNewSubTypes(res.subType)
            });
        SubTypeService.getAll()
            .then( res => {
                setSubTypes(res)
            });

    },[propertyId]);
    function multiSelectHandler(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setNewSubTypes(value);
        console.log(value)
    }
    return (
        <div>
            <Button outline style={{ 'margin-left':"5px"}} color="primary" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Update product property</ModalHeader>
                <form onSubmit={submitHandler}>
                    <ModalBody>

                        <FormGroup>
                            <label>Name</label>
                            <Input
                                placeholder="property Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Description</label>
                            <Input
                                placeholder="property description"
                                type="text"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>

                            <label>type</label>
                            <Input
                                placeholder="property type"
                                type="text"
                                name="description"
                                value={type}
                                onChange={e => setType(e.target.value)}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="typeSelect">Product SubType</Label>
                            <Input required onChange={e => multiSelectHandler(e)} type="select" name="type" id="typeSelect" multiple>

                                {
                                    subTypes.length ?
                                        subTypes.map(Type => {if(newSubTypes.includes(Type)){ return <option selected value={Type._id}>{Type.name}</option> } else { return <option value={Type._id}>{Type.name}</option>}}) :
                                        null
                                }
                            </Input>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >save</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default UpdateProductProperty;
