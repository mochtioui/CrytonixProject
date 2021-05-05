/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import Label from "reactstrap/es/Label";
import PropertyService from "../../services/product/ProductProperty.service";
import Select from "react-select";

const AddProductProperty = (props) => {

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subTypes, setSubTypes] = useState([]);
  const [options, setOptions] = useState([]);
  const [newSubTypes, setNewSubTypes] = useState([]);
  const [type, setType] = useState("");
  const [ss, setSS] = useState("");

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {name:name,description:description,type:type,subType:newSubTypes};
    console.log(data);
    PropertyService.create(data)
        .then( res => {
          props.refreshTable();
          toggle();
        })
  };
  useEffect(() => {
    SubTypeService.getAll()
        .then( res => {
   res.forEach(sub => {
    const option = { value: sub._id, label: sub.name };
   options.push(option);

   setOptions(options);

})
        })

  },[ss]);

    function multiSelectHandler(e) {

        var value = [];
        for (var i = 0, l = e.length; i < l; i++) {

                value.push(e[i].value);

        }
        setNewSubTypes(value);

    }


    return (
      <div>
        <Button style={{ 'margin-left':"5px"}} color="primary" onClick={toggle}>Add</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add new product property</ModalHeader>
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

              </FormGroup>
                <Select
                    isMulti
                    name="subTypes"
                    options={options}
                    onChange={e => multiSelectHandler(e)}
                    required
                />
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

export default AddProductProperty;
