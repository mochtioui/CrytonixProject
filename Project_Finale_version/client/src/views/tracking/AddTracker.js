/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import TrackingService from "../../services/product/tracking.service";

const AddTracker = (props) => {


  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [original, setOriginal] = useState("");
  const [short, setShort] = useState("");

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
    let website =sessionStorage.getItem('webselect');
    website = JSON.parse(website);
    const data = {"name":name,"original":original,"short":short,type:"tracker",website:website._id};
    console.log(data);
    TrackingService.create(data)
        .then( res => {
          console.log(res);
          props.refresh();
        })
  };

  return (
      <div>
        <button onClick={toggle} className="btn btn-primary btn-round btn-icon"><i className="nc-icon nc-simple-add"/></button>
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
              <label>Url to track</label>
              <Input
                  placeholder="ex:https://www.exemple.com"
                  type="text"
                  required
                  name="original"
                  value={original}
                  onChange={e => setOriginal(e.target.value)}

              />
            </FormGroup>
            <FormGroup>
              <label>short </label>
              <Input
                  placeholder="custom url"
                  type="text"
                  required
                  name="original"
                  value={short}
                  onChange={e => setShort(e.target.value)}

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

export default AddTracker;
