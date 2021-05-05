/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import Label from "reactstrap/es/Label";
import SubTypeService from "../../services/product/ProductSubType.service";
import UpdateProductSubType from "./UpdateProductSubType";

const AddProductSubType = (props) => {


  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [ss, setSS] = useState("");

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {name:name,description:description,productType:typeId};
    console.log(data);
    SubTypeService.create(data)
        .then( res => {
props.refreshTable();
          toggle();
               })
  };
  useEffect(() => {
    TypeService.getAll()
        .then( res => {
            setTypes(res)
        })

  },[ss]);
  return (
      <div>
        <Button  color="primary" onClick={toggle}>Add</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add new product Sub type</ModalHeader>
          <form onSubmit={submitHandler}>
          <ModalBody>

            <FormGroup>
              <label>Name</label>
              <Input
                  placeholder="Type Name"
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
                  placeholder="Type description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
              />
            </FormGroup>
            <FormGroup>
              <Label for="typeSelect">Product Type</Label>
              <Input onChange={e => setTypeId(e.target.value)} type="select" name="type" id="typeSelect">

                {
                  types.length ?
                      types.map(Type => <option value={Type._id}>{Type.name}</option>) :
                      null
                }
              </Input>
            </FormGroup>

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

export default AddProductSubType;
