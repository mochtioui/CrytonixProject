/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import Label from "reactstrap/es/Label";
import PropertyService from "../../services/product/ProductProperty.service";
import Select from "react-select";

const AssignToWebsite = (props) => {

  const [modal, setModal] = useState(false);
  const [websiteId, setWebsiteId] = useState("");
  const [description, setDescription] = useState("");
  const [subTypes, setSubTypes] = useState([]);
  const [options, setOptions] = useState([]);
  const [subType, setSubType] = useState("");
  const [types, setTypes] = useState([]);
  const [properties, setProperties] = useState([]);
  const [labels, setLabels] = useState([]);

  const [type, setType] = useState("");
  const [ss, setSS] = useState("");

  const toggle = () => setModal(!modal);

  const submitHandler = (e) => {
    e.preventDefault();
      PropertyService.createMany(labels)
          .then( res => {
              console.log(res);
          });
    properties.forEach(property => {
        property.subType.push(subType);
        PropertyService.update(property,property._id)
            .then( r => {

                props.refreshTable();
                toggle();
            })
    });

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
      TypeService.getByWebsite(data._id).then( res => {
          res.forEach(typ => {
              const Type = { value: typ._id, label: typ.name };
              types.push(Type);

              setTypes(types);

          })
      });
      }
  },[ss]);

    function multiSelectHandler(e) {

        var value = [] , labs =[];
        for (var i = 0, l = e.length; i < l; i++) {

            value.push(e[i].property);
            const label = {label:'',property:e[i].property._id,website:websiteId};
            labs.push(label);
        }
        setProperties(value);
        setLabels(labs);
    }
    function getProperties(e) {
        setSubType(e.value);
        PropertyService.getNotAssigned(e.value).then(res => {
            const props = [];
            res.forEach(prop => {





                const Prop = { value: prop._id, label: prop.name ,property:prop };
                props.push(Prop);

                setOptions(props);

            })
        })
    }
    function SelectHandler(e) {
        console.log(e.value);
        SubTypeService.getByWebsite(websiteId,e.value)
            .then( res => {
                console.log(res);
                const subs = [];
                res.forEach(sub => {

                    const Type = { value: sub._id, label: sub.name };
                    subs.push(Type);

                    setSubTypes(subs);

                })
            })
    }

    return (
      <div  style={{ 'margin-left':"10px"}}>
        <Button color="primary" onClick={toggle}>Assign</Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Assign property to subtype</ModalHeader>
          <form onSubmit={submitHandler}>
            <ModalBody>




              <FormGroup>
                <Label for="typeSelect">Product Type</Label>


                <Select
                    required
                    name="Types"
                    options={types}
                    onChange={e => SelectHandler(e)}

                />
              </FormGroup>
                <FormGroup>
                    <Label for="typeSelect">Product SubType</Label>


                    <Select
                        required
                        name="subTypes"
                        options={subTypes}
                        onChange={e => getProperties(e)}

                    />

                </FormGroup>
                <FormGroup>
                    <Label for="typeSelect">Product Properties</Label>


                    <Select
                        isMulti
                        name="properties"
                        options={options}
                        onChange={e => multiSelectHandler(e)}
                        required
                    />
                </FormGroup>
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
                                    required
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
