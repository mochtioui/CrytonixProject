import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Translator from "../../../components/Translator/translator";

const token = localStorage.getItem("token");


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : props.page,
            imagePreviewUrl: '',
            user: jwt_decode(token).users,
            translator: ''

        }
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            page : props.page,
        })
    }

    handleImageChange = (e) => {

        e.preventDefault()

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {

            if ( file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' ) {
                reader.onloadend = () => {
                    this.setState({
                        page: {
                            ...this.state.page,
                            page_img: file
                        },
                        imagePreviewUrl: reader.result,
                        errors: {
                            ...this.state.errors,
                            page_img: ''
                        },
                    }, ()=> this.props.handle(this.state.page, this.state.imagePreviewUrl));
                }

                reader.readAsDataURL(file)



            }
            else {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        page_img: 'Image (Files allowed: png jpg jpeg)'
                    }
                })
            }
        }


    }


    handleChange = (event) => {

        this.setState({
            errors: {
                ...this.state.errors,
                [event.target.name] : ''
            },
            page: {
                ...this.state.page,
                [event.target.name] : event.target.value
            }
        }, () => {
            this.props.handle(this.state.page)
        })
    }


    sourceTranslator = (type) => {
        this.setState({
            translator: type
        })
    }

    saveTranslator = async (translatedText) => {

        translatedText &&
        this.setState({
            page: {
                ...this.state.page,
                [this.state.translator] : translatedText
            },
        }, () => this.props.handle(this.state.page))

        this.setState({
            translator: ''
        })

    }

    render() {
        const { page, imagePreviewUrl, user, translator } = this.state
        return (
            <div className="sidebar-editor">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#page">Page </a>
                    </li>
                    
                </ul>
                <div className="tab-content">
                    <div id="page" className="tab-pane active">
                        <div id="sidebar-config" className="sidebar_config">
                            <div className="config_item">
                                <div className="item_title" data-toggle="collapse" href="#collapse1">
                                    <p className="item-title_text">
                                        Page info
                                    </p>
                                    <span className="item-title_toggle">
                                        <i className="nc-icon nc-minimal-down"></i>
                                    </span>
                                </div>
                                <div id="collapse1" className="collapse show" data-parent="#sidebar-config">
                                    <div className="item-body">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <div className="input_icon">
                                                <input type="text" className='form-control' name='page_name' disabled={ ( user.role === 'Freelancer' || user.role === 'Content Editor' ) } onChange={ this.handleChange } defaultValue={ page.page_name } value={ page.page_name } />
                                                {
                                                    page.page_name &&
                                                    <span className="btn_trans" onClick={ () => this.sourceTranslator('page_name') }><i className="nc-icon nc-refresh-69"></i></span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="config_item">
                                <div className="item_title" data-toggle="collapse" href="#collapse2">
                                    <p className="item-title_text">
                                        Content Variable
                                    </p>
                                    <span className="item-title_toggle">
                                        <i className="nc-icon nc-minimal-down"></i>
                                    </span>
                                </div>
                                <div id="collapse2" className="collapse show" data-parent="#sidebar-config">
                                    {
                                        ( user.role === 'Administrator' || user.role === 'Content director' ) &&
                                        <div className="item-body">
                                        <div className="form-group">
                                            <label>Image</label>
                                            <div className="input_file">
                                                <input type="file" className="form-control"  accept=".png, .jpg, .jpeg" onChange={ this.handleImageChange } />
                                                <div className="file_preview">
                                                    {
                                                        imagePreviewUrl ?
                                                            <img src={imagePreviewUrl} />
                                                            :
                                                            page.page_img ?
                                                                <img src={ require('../../../assets/img/page/'+ page.page_img)} />
                                                                :
                                                                page.layout.layout_name === 'detail' ?
                                                                    <img src={ require('../../../../../assets/product/'+ page.product.picture)} />
                                                                    :
                                                                    <p className="input_text">Drag your files here or click in this area</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
               
                </div>
                {
                    translator &&
                    <Translator sourceText = { page[translator] } save = { this.saveTranslator } />
                }
            </div>
        );
    }

}

export default Sidebar;
