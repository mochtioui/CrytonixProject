import React, {Suspense} from 'react';
import '../../css/Style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'
import Compare from "./compare";
import EditorInputText from "../editorInputText";



class Sidebar_compare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            minimize_width: true,
            show: false,
            compares : props.compares,
            property : props.property,
        }
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            compares : props.compares,
        })
        props.compares.length < 2 &&
        this.setState({
            show : false,
        })
    }

    handleToggle = () => {
        this.setState({
            minimize_width: ! this.state.minimize_width
        })
    }

    handleClickOutside() {
        this.setState({
            minimize_width: true,
        })
    }

    compareClick = () => {
        this.setState({
            show: true,
            minimize_width: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
            minimize_width: false
        })
    }

    removeCompare = (page_product) => {
        this.props.handleCompare(page_product)
    }


    render() {
        const { minimize_width, show, compares, property } = this.state
        const products = compares.map(page =>

            <div className="product_item" key={ page._id}>
                <h3 className="product_title">{ page.page_name }</h3>
                <img className="product_img" src={ page.page_img ? require('../../../../assets/img/page/' + page.page_img) : require('../../../../../../assets/product/' + page.product.picture) }/>
                <span className="btn_remove" onClick={ () => this.removeCompare(page) }>
                    <i className="nc-icon nc-simple-remove"></i>
                </span>
            </div>
        )

        return (
            <div className={ minimize_width ? 'product_compare minimize_compare' : 'product_compare' }>
                <div className="compare_header">
                    <div className="toggle-menu" onClick={ this.handleToggle }>
                        <i className={ minimize_width ? 'nc-icon nc-minimal-left' : 'nc-icon nc-minimal-right' }></i>
                        <i className={ minimize_width ? 'nc-icon nc-minimal-left' : 'nc-icon nc-minimal-right' }></i>
                        <i className={ minimize_width ? 'nc-icon nc-minimal-left' : 'nc-icon nc-minimal-right' }></i>
                    </div>
                    <h3 className="compare_title">
                       Compare Products
                    </h3>
                </div>
                <div className="compare_body">
                    <div className="list_product">
                        { products }
                    </div>
                    {
                        compares.length > 1 &&
                        <button className="btn btn-primary btn_compare" onClick={ this.compareClick }>
                            Compare
                        </button>
                    }
                </div>
                {
                    show &&
                    <Compare compares = { compares } property = { property } close = { this.handleClose } remove = { this.removeCompare } />
                }
            </div>
        );
    }
}

export default onClickOutside(Sidebar_compare);
