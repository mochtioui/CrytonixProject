import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link, withRouter   } from "react-router-dom";
import Category from "../../theme/theme1/views/category";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import servicePage from "../../services/page.service";
import serviceSite from "../../services/website.service";



class PageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            website : '',
            alert_top : '',
            alert: '',
            imagePreviewUrl: ''
        }
    }

    loadComponent() {
        const { page, website, imagePreviewUrl } = this.state
        const Component = React.lazy(() => import('../../theme/'+ website.theme.theme_name + '/views/' + page.layout.layout_name))
        return <Component page = { page } editor = { false } handle = { this.handleChange } imagePreviewUrl = { imagePreviewUrl } website = { website } />

    }

    handleChange = (page, imagePreviewUrl) => {
        this.setState({
            page: page,
            alert_top : '',
            imagePreviewUrl: imagePreviewUrl
        })
    }

    componentDidMount() {
        serviceSite.webSite()
            .then( res =>
                this.setState({
                    website : res
                })
            )
    }

    savePage = () => {

        const { page } = this.state
        let formData = new FormData();

        formData.append('page',JSON.stringify(page))
        formData.append('page_img',page.page_img)

        if ( ! page._id ) {

            servicePage.addPage(formData)
                .then(res => {
                    res.message ?
                        this.setState({
                            alert_top : res.message
                        })
                        :
                        this.setState({
                            page: res,
                            alert: 'Page saved ...'
                        }, () =>  this.props.history.push('/block-editor/' + this.state.page._id ))
                })

        }
        else {
            servicePage.editPage(formData)
                .then(res => {
                    res.message ?
                        this.setState({
                            alert_top : res.message
                        })
                        :
                        this.setState({
                            page: res,
                            alert: 'Page saved ...'
                        })
                })
        }
        setTimeout(() =>{
            this.setState({
                alert: ''
            })
        },2000)

    }


    render() {
        const { page, errors, website, alert_top, alert } = this.state
        return (
            <div className="wrapper-editor">
                <Header component="pageEditor" page={ page } save = { () => this.savePage() } />
                <Sidebar  page={ page }  handle = { this.handleChange } errors = { errors } />
                <div className={ 'content-editor  wrapper-' + website.theme?.theme_name }>
                    {
                        alert_top &&

                        <div className="alert alert-danger">
                            { alert_top }
                        </div>
                    }

                    <Suspense fallback={<div>Loading ...</div>}>
                        { website.theme && this.loadComponent() }
                    </Suspense>
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

export default withRouter(PageEditor);
