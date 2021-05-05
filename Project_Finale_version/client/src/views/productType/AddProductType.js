/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";

const AddProductType = (props) => {


  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {"name":name,"description":description};
    console.log(data);
    TypeService.create(data)
        .then( res => {
          console.log(res);
          props.refreshTable();
        })
  };

  return (
      <div>
        <Button color="primary" onClick={toggle}>Add</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add new product type</ModalHeader>
          <form onSubmit={submitHandler}>
          <ModalBody>

            <FormGroup>
              <label>Name</label>
              <Input
                  placeholder="Type Name"
                  type="text"
                  name="name"
                  required
                  onChange={e => {setName(e.target.value);}}

              />
            </FormGroup>
            <FormGroup>
              <label>Description</label>
              <Input
                  placeholder="Type description"
                  type="text"
                  required
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}

              />
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

export default AddProductType;
