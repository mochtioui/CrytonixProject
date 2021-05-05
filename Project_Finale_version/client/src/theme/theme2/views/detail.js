import React from 'react';
import {Link} from "react-router-dom";
import Add from "../components/description/add";
import servicePage from "../../../services/page.service";
import EditorText from "../components/editorText";
import serviceProducts from '../../../services/product/Product.service'
import serviceProductProperty from "../../../services/product/ProductProperty.service";
import jwt_decode from "jwt-decode";
import EditorInputText from "../../theme1/components/editorInputText";
import {ContentState, EditorState} from "draft-js";
import TrackingService from "../../../services/product/tracking.service";

const token = localStorage.getItem("token");

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: props.editor,
            website: props.website,
            page: props.page,
            product_property: '',
            editor_text : '',
            alert: '',
            show: false,
            user: token && jwt_decode(token).users

        }
    }

    componentDidMount() {

        serviceProducts.productDetails(this.state.page.product._id, this.state.website._id)
            .then( res => {
                TrackingService.productClick(this.state.website._id,res._id).then();

                this.setState({

                    page : {
                        ...this.state.page,
                        product: res
                    }
                });
            })

        serviceProductProperty.getBySubType(this.state.page.productSubType._id)
            .then( res => {
                this.setState({
                    product_property : res,
                });
            })
    }

    addClick = () => {
        this.setState({
            show: true
        })
    }
    RedirectToBank = (id) => {
        TrackingService.addBankClick(this.state.websiteId,id).then();
    }
    addDescription = (description) => {

        let list_description = [description]

        if ( this.state.page.list_description ) {
            list_description = [...this.state.page.list_description , description]
        }
        this.setState({
            page: {
                ...this.state.page,
                list_description : list_description
            }
        }, () => this.savePage())

        this.handleClose()

    }

    removeDescription = (index) => {
        this.setState({
            page: {
                ...this.state.page,
                list_description:  this.state.page.list_description.filter((description, i) => i !== index),
            }
        }, () => this.savePage() )
    }

    handleTextClick = (editor_text) => {

        ( this.state.user.role === 'Freelancer' || this.state.user.role === 'Content Editor' ) &&
        this.setState({
            editor_text: editor_text
        })
    }

    handleTextChange = (text) => {
        const event = this.state.page[this.state.editor_text] !== text

        this.setState({
            page: {
                ...this.state.page,
                [this.state.editor_text] : text
            },
            editor_text: ''
        })

        event && this.savePage()
    }

    handleItemDescriptionClick = (type, index) => {
        ( this.state.user.role === 'Freelancer' || this.state.user.role === 'Content Editor' ) &&
        this.setState({
            editor_text: {
                index: index,
                type: type
            }
        })
    }

    handleItemDescriptionChange = (text) => {

        const { editor_text } = this.state

        const list_description = [...this.state.page.list_description]

        const event = list_description[editor_text.index][editor_text.type] !== text

        list_description[editor_text.index][editor_text.type] = text

        this.setState({
            page: {
                ...this.state.page,
                list_description: list_description
            },
            editor_text: ''
        }, () =>  event && this.savePage())

    }


    handleClose = () => {
        this.setState({
            show: false
        })
    }

    savePage() {

        const { page } = this.state
        const { imagePreviewUrl } = this.props

        if ( this.state.editor ) {

            let formData = new FormData();

            formData.append('page',JSON.stringify(page))

            servicePage.editPage(formData)
                .then(res => {
                    if (! res.message)
                        this.setState({
                            page : res,
                            alert : 'Page saved ...'
                        })
                })

            setTimeout(() =>{
                this.setState({
                    alert: ''
                })
            },2000)

        } else {
            this.props.handle(this.state.page)
        }

    }

    render() {

        const { imagePreviewUrl } = this.props
        const { page, editor_text, alert, show, product_property, user } = this.state

        const intro_product_text = editor_text === 'intro_product_text' ?
            <EditorText editorState = { page.intro_product_text ? page.intro_product_text : '' } editor = { this.handleTextChange } />
            :
            <p  className="product_desc_text" onClick={ () => this.handleTextClick('intro_product_text') }>
                { page.intro_product_text ? page.intro_product_text : 'Description of product' }
            </p>


        const list_description = page.list_description && page.list_description.map((description, index) =>
            <div className="product_desc" key={ index }>
                {
                    ( user.role === 'Freelancer' || user.role === 'Content Editor' ) &&
                    <div className="toggle_btn">
                        <span className="icon_btn" onClick={ () => this.removeDescription(index) }>
                            <i className="nc-icon nc-simple-remove"></i>
                        </span>
                    </div>
                }

                {
                    editor_text.index === index  && editor_text.type === 'title' ?
                        <EditorText editorState = { description.title } editor = {this.handleItemDescriptionChange} />
                        :
                        <h4 className="product_desc_title" onClick={ () => this.handleItemDescriptionClick('title', index) }>
                            { description.title }
                        </h4>

                }

                {
                    editor_text.index === index  && editor_text.type === 'text' ?
                        <EditorText editorState = { description.text } editor = {this.handleItemDescriptionChange} />
                        :
                        <p className="product_desc_text" onClick={ () => this.handleItemDescriptionClick('text', index) }>
                            { description.text }
                        </p>
                }

            </div>
        )

        const list_property = product_property && product_property.map( prop =>
            <tr key={ prop._id }>
            <th> { page.product[prop.name].label ?  page.product[prop.name].label?.label : prop.name }</th>
            <td> { page.product[prop.name].value ? page.product[prop.name].value : 'Na' } </td>
        </tr>


        )

        const link_site = editor_text === 'link_site' ?
            <EditorInputText editorState = { page.link_site ? page.link_site :  'Go to web site' } editor = { this.handleTextChange } />
            :
            <>
                <a className="btn btn-primary" target="_blank" onClick={() =>this.RedirectToBank(page.product._id)} href={ page.product.bankLink }>  { page.link_site ? page.link_site :  'Go to web site' } </a>
                {
                    ( user.role === 'Freelancer' || user.role === 'Content Editor' ) &&
                    <div className="toggle_btn">
                        <span className="icon_btn" onClick={() => this.handleTextClick('link_site')}>
                            <i className="nc-icon nc-ruler-pencil"></i>
                        </span>
                    </div>
                }
            </>



        return (
            <div className="container">
                <div className="breadcrumb">
                    <Link to={'/website/home'} className="navigation_page"> Home </Link>
                    <span className="navigation_pipe">/</span>
                    <Link to={'/website/' + page.SubTypePage.productTypePage.page_name } className="navigation_page"> { page.SubTypePage.productTypePage.page_name } </Link>
                    <span className="navigation_pipe">/</span>
                    <Link to={'/website/'  + page.SubTypePage.productTypePage.page_name + '/' + page.SubTypePage.page_name } className="navigation_page"> { page.SubTypePage.page_name } </Link>
                    <span className="navigation_pipe">/</span>
                    <span className="navigation_page"> { page.page_name } </span>
                </div>

                <div className="content_product">
                    <div className="product_header">
                        <div className="row">
                            <div className="col-md-4 offset-md-1">
                                {
                                    imagePreviewUrl ?
                                        <img src={ imagePreviewUrl }  className="product_img" />
                                        :
                                        <img src={ page.page_img ? require('../../../assets/img/page/'+page.page_img) : require('../../../../../assets/product/'+page.product.picture)} className="product_img" />
                                }
                            </div>
                            <div className="col-md-7">
                                <h1 className="product_title">
                                    { page.page_name }
                                </h1>
                                <div className="btn btn-primary btn_link_site">
                                    { link_site }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6">
                            <div className="list_product_desc">

                                { intro_product_text }

                                { list_description }

                                {
                                    ( user.role === 'Freelancer' || user.role === 'Content Editor' ) &&
                                    <button className="btn btn-secondary" onClick={this.addClick}>
                                        Add description
                                    </button>
                                }
                                <Add show = { show }  add={ this.addDescription } hide={ this.handleClose }/>

                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 offset-md-1 col-md-5">
                            <div className="product_prop">
                                <h3 className="product_prop_title">
                                    Caractéristiques
                                </h3>
                                <table className="table table_prop">
                                    <tbody>
                                    { list_property }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    alert &&
                    <div className="alert_saved">
                        <span> { alert } </span>
                    </div>
                }
            </div>
        );
    }
}

export default Detail;
