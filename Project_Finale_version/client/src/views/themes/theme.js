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
import React from "react";
import serviceTheme from "../../services/theme.service";
import { Link} from "react-router-dom";
import AddTheme from "./addTheme";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import RemoveTheme from "./removeTheme";


class Theme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _add : false,
            _edit : false,
            _remove : false,
            themes : '',
            alert: '',
            theme: ''

        }
    }

    componentDidMount() {

        serviceTheme.getTheme()
            .then(res =>
                this.setState({
                    themes : res
                })
            )
    }

    addTheme = () => {
        this.setState({
            _add : true,
        })
    }

    editTheme = (theme) => {
        this.setState({
            _edit : true,
            theme: theme
        })
    }

    handleClose = (alert) => {
        this.setState({
            _add : false,
            _edit : false,
            _remove : false,
            theme: '',
            alert: alert ? alert : '',
        })

        setTimeout(() =>{
            this.setState({
                alert: ''
            })
        },2000)
    }

    handleTheme = (theme) => {
        if ( this.state._remove ) {
            this.setState({
                themes: this.state.themes.filter((item) => item._id !== this.state.theme._id),
            })

            this.handleClose('Theme removed ...')


        } else if ( this.state._edit ) {

            const themes = [...this.state.themes]
            const index = themes.findIndex(item => item._id === theme._id)
            themes[index] = theme

            this.setState({
                themes: themes,
            })

            this.handleClose('Theme saved ...')


        } else {

            this.setState({
                themes: [...this.state.themes,theme],
            })

            this.handleClose('Theme saved ...')
        }
    }

    removeTheme = (theme) => {
        this.setState({
            theme: theme,
            _remove: true
        })
    }


    render() {

        const { _add, _edit, _remove, alert } = this.state

        const themes = this.state.themes &&
            this.state.themes.map((theme) =>
                <div className="col-xs-12 col-sm-6 col-md-4" key={ theme._id }>
                    <div className="theme_list_item">
                        <div className="theme_item_img"  style={{ backgroundImage: `url(` + require(`../../assets/img/theme/`+ theme.theme_img) + `)`}}>
                            <div className="theme_bg"></div>
                            <h2 className="theme_item_title">
                                { theme.theme_name }
                            </h2>
                            <div className="dropdown theme_item_dropdown">
                              <span className="item-btn_setting" data-toggle="dropdown">
                                <i className="nc-icon nc-settings-gear-65"></i>
                              </span>
                                <div className="dropdown-menu dropdown-menu-right">
                                <span className="dropdown-item" onClick={ () => this.editTheme(theme) }>
                                  <i className="nc-icon nc-ruler-pencil"></i> Edit
                                </span>
                                    <div className="dropdown-divider"></div>
                                    <span className="dropdown-item" onClick={ () => this.removeTheme(theme) }>
                                  <i className="nc-icon nc-simple-remove"></i>
                                  Remove
                                </span>
                                </div>
                            </div>
                        </div>
                        <p className="theme_item_desc">
                            {  theme.description }
                        </p>
                    </div>
                </div>
            )


        return (
            <>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            {
                                _add || _edit ?
                                    <AddTheme handle={ this.handleTheme }  theme= { this.state.theme } close={ this.handleClose } />
                                    :
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-auto mr-auto">
                                                    <button className="btn btn-info" onClick={ this.addTheme }>
                                                        Add theme
                                                    </button>
                                                </div>
                                                <div className="col-auto toolbar">
                                                    <div className="no-border input-group input-search">
                                                        <input placeholder="Search..." type="text" className="form-control"/>
                                                        <div className="input-group-append">
                            <span className="input-group-text">
                              <i className="nc-icon nc-zoom-split"></i>
                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="themes-theme_list">
                                                <div className="row">
                                                    { themes }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        this.state.theme && <RemoveTheme show = { _remove } close = { this.handleClose } theme = { this.state.theme } hanlde ={ this.handleTheme }  />
                    }

                </div>
                {
                    alert &&
                    <div className="alert_saved">
                        <span> { alert } </span>
                    </div>
                }

            </>
        );
    }
}

export default Theme;
