import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Link , withRouter } from "react-router-dom";

class Header extends React.Component {

    constructor() {
        super();
    }

    useLayoutClick = () => {
        this.props.useLayout()
    }

    savePage = () => {
        this.props.save()
    }

    redirectBack(){
        this.props.history.push('/admin/pages')
    }


    render() {
        const { layout, component, page } = this.props
        return (
            <nav className="navbar navbar-expand-md navbar-editor navbar-dark fixed-top">
                <a className="navbar-brand"  onClick={() => { window.confirm('Some changes are not saved. Are you sure you want to leave this page?') && this.redirectBack() }}>
                    <i className="nc-icon nc-minimal-left"></i>
                </a>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        { component === 'pageEditor' &&  <span>{ page.layout.layout_name }</span> }
                    </ul>
                    <div className="navbar-button mt-md-0">
                        { component === 'pageEditor' ?
                            <>
                                <Link className="btn btn-outline-info" disabled={ ! page._id } to={
                                    page.layout.layout_name === 'detail' ?
                                        '/website/' + page.SubTypePage.productTypePage.page_name + `/` + page.SubTypePage.page_name + `/` +page.page_name
                                        :
                                        page.layout.layout_name === 'subcategory' ?
                                            '/website/' + page.productTypePage.page_name  + `/` +page.page_name
                                            :
                                            '/website/' +page.page_name
                                }>Preview</Link>
                                <button className="btn btn-info" onClick={ this.savePage } disabled={ page.page_name === ''}>Save...</button>
                       
                            </>
                            :
                            <button className="btn btn-info" onClick={ this.useLayoutClick }>Use { layout.layout_name } layout</button>
                        }

                    </div>
                </div>
            </nav>
        );
    }

}

export default withRouter(Header);
