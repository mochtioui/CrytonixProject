/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import Label from "reactstrap/es/Label";
import PropertyService from "../../services/product/ProductProperty.service";
import Select from "react-select";

const AssignToWebsite = (props) => {
    const {subtype} =props;

  const [modal, setModal] = useState(false);
  const [websiteId, setWebsiteId] = useState("");
  const [properties, setProperties] = useState([]);
  const [labels, setLabels] = useState([]);

  const [ss, setSS] = useState("");

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
     SubTypeService.assignTypeToWebsite(websiteId,subtype).then(r => {

                PropertyService.createMany(labels)
                    .then();
                props.refreshTable();
                toggle();
     })


  };
    function  changeHandler(e,property) {

        labels.map((l,i) =>{
            if( l.property === property._id){
                l.label = e.target.value;

            }

        });
        setLabels(labels);


    }
  useEffect(() => {
      let data =sessionStorage.getItem('webselect');
      data = JSON.parse(data);


      if(data != null ) {
          console.log(data._id);
      setWebsiteId(data._id);
          PropertyService.getBySubType(subtype._id).then(properties =>{
                  setProperties(properties) ;
                  properties.map(p=>{
                      const label = {label:'',property:p._id,website:data._id};
                      labels.push(label);



                  });
                  setLabels(labels);
              }
          );

      }
  },[ss]);



    return (
      <div>
        <Button color="primary" outline style={{ 'margin-left':"5px"}} onClick={toggle}>Assign</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Assign SubType to Website</ModalHeader>
          <form onSubmit={submitHandler}>
            <ModalBody>


                {
                    properties.length ?
                        properties.map((property,i) =>
                            <FormGroup>
                                <label>{property.name}</label>
                                <Input
                                    placeholder="label "
                                    type="text"
                                    name={i}
                                    onChange={e => {changeHandler(e,property);}}

                                />
                            </FormGroup>
                        )
                        : null
                }
            </ModalBody>

            <ModalFooter>
              <Button color="primary" type="submit" >Assign</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
  );
};

export default AssignToWebsite;
