import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";


import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import { MoviesData, renderMovieTitle } from './country-data';
import { LanguageData, LanguageTitle } from './language-data';
import { CurrencyData, CurrencyTitle } from './currency-data';
import Autocomplete from 'react-autocomplete';
import ScriptTag from 'react-script-tag';
import '../../assets/scss/websiteListe';
import '../../assets/css/WebsiteListe.css';
class Web_add extends React.Component {
    state = { name :"", val: '' , lang:''  , Currency:'' , About:{},images:{} ,theme:{} };



    Styleherder= ()=>{
        return{

            backgroundColor : '#2926EA' ,
            color : 'white',

            border : '50 px',
            padding : '52 px  19px',

            textAlign :'center'


        }
    };

    render() {
        return (

<div className="row">
<div className="col-md-12 nav-link" style={this.Styleherder()}  >Add Website form</div>



        <Link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <Link href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet"/>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>










    <div className="col-md-8" >
        <div className="card-user card">
            <div className="card-header"><h5 className="card-title">Add Website</h5></div>
            <div className="card-body">
                <form className="">
                    <div className="row">
                        <div className="pr-1 col-md-5">
                            <div className="form-group"><label>Website name</label><input disabled=""
                                                                                                placeholder="Website"
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                         />
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <Col>
                        <div  className="pr-1 col-md-5">
                            <div className="form-group">
                                <div className="autocomplete-wrapper">
                                    <label>Country name</label>
                                    <Autocomplete
                                        value={this.state.val}
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
                                        onChange={(event, val) => this.setState({ val })}
                                        onSelect={val => this.setState({ val })}
                                    />
                                </div>
                            </div>



                        </div>
                    </Col>

                        <Col>
                            <div  className="pr-1 col-md-5">
                                <div className="form-group">
                                    <div className="autocomplete-wrapper">
                                        <label>Language</label>
                                        <Autocomplete
                                            value={this.state.lang}
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
                                            onChange={(event, lang) => this.setState({ lang })}
                                            onSelect={lang => this.setState({ lang })}
                                        />
                                    </div>
                                </div>



                            </div>
                        </Col>
                        <Col>
                            <div  className="pr-1 col-md-5">
                                <div className="form-group">
                                    <div className="autocomplete-wrapper">
                                        <label>Currency-sign</label>
                                        <Autocomplete
                                            value={this.state.Currency}
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
                                            onChange={(event, Currency) => this.setState({ Currency })}
                                            onSelect={Currency => this.setState({ Currency })}
                                        />
                                    </div>
                                </div>



                            </div>
                        </Col>

                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group"><label>About Site</label><textarea  className="form-control">Oh so, your weak rhyme You doubt I'll bother, reading into it</textarea>
                            </div>
                        </div>
                    </div>

                    <div className="field" align="left">
                        <h3>Upload your images</h3>
                        <input type="file" id="files" name="files[]" multiple/>
                    </div>


                    <Link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet"
                          id="bootstrap-css"/>



                        <div>
                        <a className="btn btn-primary" role="button" href="#model-id" data-toggle="modal">Theme select </a>
                        <br/>
            </div>
            <div tabIndex="-1" className="modal fade" id="model-id" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="close" aria-hidden="true" type="button" data-dismiss="modal">×</button>
                        </div>
                        <Link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet"
                              id="bootstrap-css"/>
                            <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
                            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


                            <div class="container">
                            <div className="selected-item">
                                <p>You Selected theme : <span>...</span></p>
                            </div>

                            <div className="dropdown">
                                <span className="selLabel">Select theme</span>
                                <input  type="hidden" name="cd-dropdown"/>
                                    <ul className="dropdown-list">
                                        <li data-value="1">
                                            <span>Theme1</span>
                                        </li>
                                        <li data-value="2">
                                            <span>Theme2</span>
                                        </li>
                                        <li data-value="3">
                                            <span>Theme3</span>
                                        </li>


                                    </ul>
                            </div>
                    </div>
                        <br/><br/><br/><br/>
                        <div className="modal-footer">
                            <button className="btn" aria-hidden="true" data-dismiss="modal">Close</button>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
                    </div>
                </div>
            </div>





                    <div className="row">
                        <div className="update ml-auto mr-auto">
                            <button type="submit" className="btn-round btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>


</div>

        )

    }

}

export default Web_add;
