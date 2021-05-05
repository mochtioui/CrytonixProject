import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Header from "./components/header";
import serviceLayout from "../../services/layout.service";

class SelectLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            layout : ''
        }

        this.handleSelectLayout = this.handleSelectLayout.bind(this)
    }

    componentDidMount() {
        serviceLayout.getLayout()
            .then(res =>
                this.setState({
                    layouts: res,
                    layout: res[0]
                })
            )
    }

    layoutClick = (layout) => {
        this.setState({
            layout : layout
        })
    }

    handleSelectLayout() {
        this.props.useLayout(this.state.layout)
    }

    render() {
        const layouts = this.state.layouts && this.state.layouts.map((layout) =>
            <div className="page_item" key={layout._id}>
                <h1 className="page_text"> { layout.layout_name } </h1>
                <div className={ this.state.layout.layout_name === layout.layout_name ? 'page_img active' : 'page_img'}  onClick={ () => this.layoutClick(layout) }>
                    <img src={ require('../../theme/' + layout.website.theme.theme_name + '/assets/img/'+ layout.layout_img) }  />
                </div>
            </div>
        )

        return (
            <>
                <Header component ="selectLayout" useLayout={ this.handleSelectLayout } layout={ this.state.layout } />
                <div className="content-page">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="menu_page">
                                    { layouts }
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="page-preview">
                                    <div className="preview_img" style={  this.state.layout.website && {  backgroundImage: `url(` + require('../../theme/' + this.state.layout.website.theme.theme_name + '/assets/img/' + this.state.layout.layout_img) + `)`}}>
                                        <div className="preview_bg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </>
        );
    }

}

export default SelectLayout;
