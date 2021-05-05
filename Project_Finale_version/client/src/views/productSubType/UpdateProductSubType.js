/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import Label from "reactstrap/es/Label";

const UpdateProductSubType = (props) => {

  const {subTypeId} =props;
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");
    const [types, setTypes] = useState([]);
    const [typeId, setTypeId] = useState("");
  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
      const data = {name:name,description:description,productType:typeId};
    console.log(data);
    SubTypeService.update(data,subTypeId)
        .then( res => {
            props.refreshTable();
            toggle();
        })
  };
  useEffect(() => {
    SubTypeService.getOneById(subTypeId)
        .then( res => {
          setName(res.name);
          setDescription(res.description);
            setTypeId(res.productType._id);
        });
      TypeService.getAll()
          .then( res => {
              setTypes(res)
          });

  },[subTypeId]);
  return (
      <div>
        <Button outline style={{ 'margin-left':"5px"}} color="warning" onClick={toggle}>Update</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Update product sub-type</ModalHeader>
          <form onSubmit={submitHandler}>
          <ModalBody>

            <FormGroup>
              <label>Name</label>
              <Input
                  placeholder="SubType Name"
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
                  placeholder="SubType description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
              />
            </FormGroup>

              <FormGroup>
                  <Label for="typeSelect">Product Type</Label>
                  <Input onChange={e => setTypeId(e.target.value)} type="select" required name="type" id="typeSelect">

                      {
                          types.length ?
                              types.map(Type => { if(Type._id === typeId){ return <option selected value={Type._id}>{Type.name}</option> } else { return <option value={Type._id}>{Type.name}</option>}}) :
                              null
                      }
                  </Input>
              </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" >Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
      </div>
  );
};

export default UpdateProductSubType;
