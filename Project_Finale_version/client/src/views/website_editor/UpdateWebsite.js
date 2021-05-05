/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState,useEffect } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Col} from 'reactstrap';
import TypeService from "../../services/product/ProductType.service";
import SubTypeService from "../../services/product/ProductSubType.service";
import Label from "reactstrap/es/Label";

import Web_serv from "../../services/website.service";

import Autocomplete from "react-autocomplete";
import {MoviesData, renderMovieTitle} from "./country-data";
import {LanguageData, LanguageTitle} from "./language-data";
import {CurrencyData, CurrencyTitle} from "./currency-data";






const UpdateWebsite = (props) => {

    const {webId} =props;
    const [modal, setModal] = useState(false);
    const [themeId, setthemeid] = useState("");
    const [domain, setdomain] = useState("");
    const [logo_pic, setlogo_pic] = useState("");
    const [site_name, setsite_name] = useState("");
    const [theme, settheme] = useState([]);
    const [layout, setlayout] = useState([]);
    const [Language, setLanguage] = useState("");
    const [Contry, setContry] = useState("");
    const [reserve, setreserve] = useState("");

    const [Curreny_sign, setCurreny_sign] = useState("");
    const [ss, setSS] = useState("");

    const toggle = () => setModal(!modal);


    const submitHandler = (e) => {
        e.preventDefault();


        const data = {"domain":domain,
            "logo_pic":logo_pic.split(/(\\|\/)/g).pop(),
            "site_name":site_name ,
            "theme" :themeId,
            "Language" :Language,
            "Contry" :Contry,
            "Curreny_sign" :Curreny_sign,
            "layouts":layout
        } ;
        if(logo_pic === "")
        {data.logo_pic=reserve.split(/(\\|\/)/g).pop()}
        console.log(data);
        Web_serv.update(data,webId)
            .then( res => {
                props.refreshTable();
                window.location.reload(false);
                toggle();
            })
    };
    useEffect(() => {
        Web_serv.getOneById(webId)
            .then( res => {
                setdomain(res.domain);
                setreserve(res.logo_pic)
                setsite_name(res.site_name);
                setLanguage(res.Language);
                setContry(res.Contry);
                setCurreny_sign(res.Curreny_sign);
                setlayout(res.layouts);
                setthemeid(res.theme)

            });
        Web_serv.getThemes()
            .then( res => {
                settheme(res)
            });

    },[webId]);
    return (
        <div>
            <Button color="warning" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Update Website  </ModalHeader>
                <form onSubmit={submitHandler}>
                    <ModalBody>

                        <FormGroup>
                            <label>site_name</label>
                            <Input
                                placeholder="Type Name"
                                type="text"
                                name="site_name"
                                value={site_name}
                                onChange={e => setsite_name(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>domain</label>
                            <Input
                                placeholder="Type description"
                                type="text"
                                name="domain"
                                value={domain}
                                onChange={e => setdomain(e.target.value)}

                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Contry</label>

                            <Autocomplete
                                value={Contry}
                                name="Contry"
                                items={MoviesData()}
                                getItemValue={item => item.name}
                                shouldItemRender={renderMovieTitle}
                                renderMenu={item => (
                                    <div className="dropdown">
                                        {item}
                                    </div>
                                )}
                                renderItem={(item, isHighlighted) =>
                                    <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                        {item.name}
                                    </div>
                                }
                                onSelect={(event) => setContry(event, 'Contry')}
                                onChange={(e) => setContry(e.target.value)}
                            />




                        </FormGroup>
                        <FormGroup >
                            <label>Language</label>
                            <Autocomplete
                                value={Language}
                                name="Language"
                                items={LanguageData()}
                                getItemValue={item => item.name}
                                shouldItemRender={LanguageTitle}
                                renderMenu={item => (
                                    <div className="dropdown">
                                        {item}
                                    </div>
                                )}
                                renderItem={(item, isHighlighted) =>
                                    <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                        {item.name}
                                    </div>
                                }
                                onSelect={(event) => setLanguage(event, 'Language')}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Currency-sign</label>
                            <Autocomplete
                                value={Curreny_sign}
                                name="Curreny_sign"
                                items={CurrencyData()}
                                getItemValue={item => item.name}
                                shouldItemRender={CurrencyTitle}
                                renderMenu={item => (
                                    <div className="dropdown">
                                        {item}
                                    </div>
                                )}
                                renderItem={(item, isHighlighted) =>
                                    <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                        {item.name}
                                    </div>
                                }
                                onSelect={(event) => setCurreny_sign(event, 'Language')}
                                onChange={(e) => setCurreny_sign(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>

                            <Label for="typeSelect">Theme Type</Label>
                            <Input onChange={e => setthemeid(e.target.value)} type="select" name="theme" id="typeSelect">

                                {
                                    theme.length ?
                                        theme.map(theme => <option   value={theme._id}>

                                            {theme.theme_name}</option>) :
                                        null
                                }
                            </Input>
                        </FormGroup>

                        <FormGroup >
                            <label>Logo</label>
                            <input value={logo_pic} hidden/>
                            <input type="file"
                                   value={logo_pic}
                                   onChange={e => setlogo_pic(e.target.value)}
                                   className="form-control" />
                        </FormGroup>



                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" type="submit" >Update</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default UpdateWebsite;
