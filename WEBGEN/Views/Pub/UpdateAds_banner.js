/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import Ads_serv from "../../services/Ads_banner/Ads_banner.service";

import '../../assets/scss/websiteListe';
import '../../assets/css/Ads.css';
import TypeService from "../../services/product/ProductType.service";


const UpdateAds_banner = (props) => {

    const {typeId} =props;
    const [modal, setModal] = useState(false);
    const [Ads_banner_name, setAds_banner_name] = useState("");
    const [description, setDescription] = useState("");
    const [Ads_img, setAds_img] = useState('');
    const [Valide_ads, setValide_ads] = useState("");
    const [ss, setSS] = useState("");
    const [reserve, setreserve] = useState("");


    const toggle = () => setModal(!modal);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {"Ads_banner_name":Ads_banner_name,
            "description":description,
            "Ads_img":Ads_img.split(/(\\|\/)/g).pop(),
            "Valide_ads" :Valide_ads} ;
        if(Ads_img === "")
        {data.Ads_img=reserve.split(/(\\|\/)/g).pop()}
        console.log(data);
        Ads_serv.update(data,typeId)
            .then( res => {
                props.refreshTable();
                toggle();
            })

    };

    useEffect(() => {
        Ads_serv.getOneById(typeId)
            .then( res => {
                setAds_banner_name(res.Ads_banner_name);
                setDescription(res.description);
                setValide_ads(res.Valide_ads);
                setreserve(res.Ads_img)
            });
        Ads_serv.getAll()
            .then( res => {
                props.refreshTable();
            });

    },[typeId]);
    return (
        <div>
            <Button color="primary" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Update  ads </ModalHeader>
                <form onSubmit={submitHandler}>
                    <ModalBody>

                        <FormGroup>
                            <label>Name</label>
                            <Input
                                placeholder="Type Name"
                                type="text"
                                name="name"
                                value={Ads_banner_name}
                                onChange={e => setAds_banner_name(e.target.value)}

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

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Valide_ads</label>

                            <select id="cars"  value={Valide_ads} name="Valide_ads" onChange={e => setValide_ads(e.target.value)}>
                                <option value="true"  >True</option>
                                <option value="false"  >False</option>

                            </select>
                        </FormGroup>


                        <FormGroup >

                            <label> click to update the  image ads </label>
                            <input value={Ads_img} hidden/>
                            <input type="file" name="Ads_img"
                                   value={Ads_img}
                                   onChange={e => setAds_img(e.target.value)}
                                   className="form-control" />



                        </FormGroup>



                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >Update</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default UpdateAds_banner;
