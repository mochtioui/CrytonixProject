import React, {Suspense} from 'react';
import '../../css/Style.css';
import { Link} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'
import serviceTheme from "../../../../services/theme.service";
import {Button, Modal} from "react-bootstrap";



class Compare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            compares: props.compares,
            property: props.property
        }
    }

    handleClose = () => {
        this.props.close()
    }

    removeCompare = (page_product) => {
        this.setState({
            compares : this.state.compares.filter(compare => compare._id !== page_product._id)
        }, () => this.props.remove(page_product))
    }

    render() {

        const { property, compares } = this.state

        return (
            <Modal show= { true }
                   size="xl"
                   onHide={ this.handleClose }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Compare products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table content_compare_prod">
                            <tbody>
                            <tr>
                                <td></td>
                                {
                                    compares.map( page_product =>
                                        <td className="compare_infos" key={ page_product._id }>
                                            <img src={ page_product.page_img ? require('../../../../assets/img/page/' + page_product.page_img) : require('../../../../../../assets/product/' + page_product.product.picture) } />
                                            <Link className="product_title" to={'/website/' + page_product.SubTypePage.productTypePage.page_name + '/' + page_product.SubTypePage.page_name + '/' + page_product.page_name}>{ page_product.page_name } </Link>
                                        </td>
                                    )
                                }
                            </tr>
                            {
                                property.map((prop) =>
                                    <tr key={ prop._id }>
                                        <td>{ compares[0].product[prop]?.label ? compares[0].product[prop]?.label?.label : prop.name }</td>
                                        {
                                            compares.map(page_product =>
                                                <td key={ page_product._id }>
                                                    { page_product.product[prop.name].value ? page_product.product[prop.name].value : 'Na' }
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                                <tr>
                                    <td>

                                    </td>
                                    {
                                        compares.map(page_product =>
                                            <td key={ page_product._id }>
                                                <span className="btn_remove" onClick={ () => this.removeCompare(page_product)}>
                                                    <i className="nc-icon nc-simple-remove"></i>
                                                </span>
                                            </td>
                                        )
                                    }
                                </tr>
                            </tbody>
                        </table>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Compare;
