/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Detail Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import servicePage from "../../services/page.service";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import RemovePage from "./removePage";


class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : '',
            show : false,
            pages : '',
            filter: ''
        }
    }

    componentDidMount() {
        servicePage.getPage()
            .then(res =>
                this.setState({
                    pages : res
                })
            )
    }

    handleClose = (pageId) => {
        this.setState({
            show : false,
            pages: this.state.pages.filter((page) => page._id !== pageId)
        })
    }

    removeClick = (page) => {
        this.setState({
            show : true,
            page : page
        })
    }

    handleFilterChange = (event) => {
        this.setState({
            filter: event.target.value
        })
    }

    render() {
        const { show, page, filter } = this.state

        const pages = this.state.pages &&
            this.state.pages.filter(page => page.layout.layout_name !== 'subcategory' && page.layout.layout_name !== 'detail' && page.page_name.match(filter)).map((page) =>
                <Fragment key={ page._id} >
                    <div className="page-list_item" data-toggle="collapse" href= { '#collapse'+ page._id }>
                        <p className="list-item_title">
                            { this.state.pages.filter(subcategory => subcategory.productTypePage?._id === page._id ).length  ? <i className="nc-icon nc-simple-add"></i> : '' }
                            { page.page_name }
                        </p>
                        <div className="dropdown item-dropdown">
                               <span className="item-btn_setting" data-toggle="dropdown" data-toggle-second="tooltip" title="Setting">
                                 <i className="nc-icon nc-settings-gear-65"></i>
                               </span>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link className="dropdown-item" to={'/website/' + page.page_name } >
                                    <i className="nc-icon nc-laptop"></i>
                                    View
                                </Link>
                                <Link className="dropdown-item" to={'/block-editor/' + page._id } >
                                    <i className="nc-icon nc-ruler-pencil"></i>
                                    Edit
                                </Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={ () => this.removeClick(page) }>
                                    <i className="nc-icon nc-simple-remove"></i>
                                    Remove
                                </a>
                            </div>
                        </div>
                    </div>
                    {
                        page.layout.layout_name === 'category' && this.state.pages.filter(subcategory => subcategory.productTypePage?._id === page._id ).length ?
                            <div className="list_subcategory collapse" id={ 'collapse'+ page._id }>
                                {
                                    this.state.pages.filter(subcategory => subcategory.productTypePage?._id === page._id ).map((subcategory) =>
                                       <Fragment  key={subcategory._id}>
                                           <div className="page-list_item"  data-toggle="collapse" href= { '#collapse'+ subcategory._id }>
                                            <p className="list-item_title">
                                                { this.state.pages.filter(product => product.layout.layout_name === 'detail' && product.productSubType?._id === subcategory.productSubType?._id ).length ? <i className="nc-icon nc-simple-add"></i> : '' }
                                                { subcategory.page_name }
                                            </p>
                                            <div className="dropdown item-dropdown">
                                                <span className="item-btn_setting" data-toggle="dropdown" data-toggle-second="tooltip" title="Setting">
                                                    <i className="nc-icon nc-settings-gear-65"></i>
                                                </span>
                                               <div className="dropdown-menu dropdown-menu-right">
                                                   <Link className="dropdown-item" to={'/website/' + subcategory.productTypePage.page_name + '/' + subcategory.page_name } >
                                                       <i className="nc-icon nc-laptop"></i>
                                                       View
                                                   </Link>
                                                    <Link className="dropdown-item" to={'/block-editor/' + subcategory._id } >
                                                        <i className="nc-icon nc-ruler-pencil"></i>
                                                        Edit
                                                    </Link>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" onClick={ () => this.removeClick(subcategory) }>
                                                        <i className="nc-icon nc-simple-remove"></i>
                                                        Remove
                                                    </a>
                                               </div>
                                            </div>
                                        </div>
                                           {
                                               this.state.pages.filter(product => product.layout.layout_name === 'detail' && product.SubTypePage?._id === subcategory._id ).length ?
                                                   <div className="list_product collapse" id={ 'collapse'+ subcategory._id }>
                                                   {
                                                       this.state.pages.filter(product => product.layout.layout_name === 'detail' && product.SubTypePage?._id === subcategory._id ).map((product) =>
                                                           <div className="page-list_item" key={product._id}>
                                                               <p className="list-item_title">
                                                                   { product.page_name }
                                                               </p>
                                                               <div className="dropdown item-dropdown">
                                                               <span className="item-btn_setting" data-toggle="dropdown" data-toggle-second="tooltip" title="Setting">
                                                                   <i className="nc-icon nc-settings-gear-65"></i>
                                                               </span>
                                                                   <div className="dropdown-menu dropdown-menu-right">
                                                                       <Link className="dropdown-item" to={'/website/' + product.SubTypePage.productTypePage.page_name + '/' + product.SubTypePage.page_name + '/' + product.page_name } >
                                                                           <i className="nc-icon nc-laptop"></i>
                                                                           View
                                                                       </Link>
                                                                       <Link className="dropdown-item" to={'/block-editor/' + product._id } >
                                                                           <i className="nc-icon nc-ruler-pencil"></i>
                                                                           Edit
                                                                       </Link>
                                                                       <div className="dropdown-divider"></div>
                                                                       <a className="dropdown-item" onClick={ () => this.removeClick(product) }>
                                                                           <i className="nc-icon nc-simple-remove"></i>
                                                                           Remove
                                                                       </a>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       )
                                                   }
                                               </div>
                                                   :
                                                   ''
                                           }
                                       </Fragment>
                                    )
                                }
                            </div>
                            :
                            ''
                    }
                </Fragment>
            )


        return (
            <>
                <div className="content">


                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <div className="col-auto mr-auto">
                                            <Link >
                                                All Pages
                                            </Link>
                                        </div>
                                        <div className="col-auto toolbar">
                                            <div className="no-border input-group input-search">
                                                <input placeholder="Search..." type="text" className="form-control" onChange={ this.handleFilterChange }/>
                                                <div className="input-group-append">
                                                      <span className="input-group-text">
                                                        <i className="nc-icon nc-zoom-split"></i>
                                                      </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    <div className="pages-page_list">
                                        { pages }
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <RemovePage show = { show } hide = { this.handleClose } page = { page } />
                </div>
            </>
        );
    }
}


export default Page;
