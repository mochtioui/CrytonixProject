/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {Button, Modal , ModalHeader, ModalBody, ModalFooter, FormGroup,Input, Col} from 'reactstrap';

import Web_serv from "../../services/website.service";
import '../../assets/scss/websiteListe';
import '../../assets/css/Ads.css';
import '../../assets/css/WebsiteListe.css';
import {MoviesData, renderMovieTitle} from "./country-data";
import Autocomplete from "react-autocomplete";
import logo from '../../assets/img/theme1.png';
import { LanguageData, LanguageTitle } from './language-data';
import { CurrencyData, CurrencyTitle } from './currency-data';
import Label from "reactstrap/es/Label";

import TypeService from "../../services/product/ProductType.service";



const AddWebsite = (props) => {


    const [modal, setModal] = useState(false);
    const [themeId, setthemeid] = useState("");
    const [domain, setdomain] = useState("");
    const [logo_pic, setlogo_pic] = useState("");
    const [site_name, setsite_name] = useState("");
    const [theme, settheme] = useState([]);
    const [Language, setLanguage] = useState("");
    const [Contry, setContry] = useState("");

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
            "layouts": [
                {
                    "layout_name": "home",
                    "layout_img": "home.png"
                },
                {
                    "layout_name": "category",
                    "layout_img": "category.png"
                },
                {
                    "layout_name": "detail",
                    "layout_img": "detail.png"
                },
                {
                    "layout_name": "subcategory",
                    "layout_img": "subcategory.png"
                },
                {
                    "layout_name": "blog",
                    "layout_img": "blog.png"
                },
                {
                    "layout_name": "BlogDetail",
                    "layout_img": "BlogDetail.png"
                }
            ]
        } ;
        console.log(data);
        Web_serv.create(data)
            .then( res => {
                props.refreshTable();
                toggle(); console.log("okkkk");
            })
    };


    useEffect(() => {
        Web_serv.getThemes()
            .then( res => {
                settheme(res)
            })

    },[ss]);



    return (
        <div>
            <Button color="primary" onClick={toggle}>Add</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add new Website  </ModalHeader>
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
                                <div className="dropdown" type="select">
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

                        <FormGroup  action="upload.php">
                            <label> click to update the Website Logo</label>

                            <input type="file" accept=".jpg, .jpeg, .png" name="Ads_img"
                                   value={logo_pic}
                                   onChange={e => setlogo_pic(e.target.value)}
                                   className="form-control" />
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

export default AddWebsite;
