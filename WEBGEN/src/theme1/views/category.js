import React, {Suspense} from 'react';
import '../css/Style.css';
import { Link} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorText from "../components/editorText";
import servicePage from '../../../services/page.service'
import serviceSubType from '../../../services/product/ProductSubType.service'
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");


class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: props.editor,
            page : props.page,
            subcategory_page : '',
            editor_text : '',
            alert: '',
            user:  token && jwt_decode(token).users
        }
    }

    componentDidMount() {
        serviceSubType.getSubTypePageByType(this.state.page._id)
            .then( res =>
                this.setState({
                    subcategory_page : res
                })
            )
    }

    handleTextClick = (editor_text) => {

        ( this.state.user.role === 'Freelancer' || this.state.user.role === 'Content Editor') &&
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
        },() => event && this.savePage())
    }

    savePage() {

        const { page } = this.state

        if ( this.state.editor ) {

            let formData = new FormData();

            formData.append('page',JSON.stringify(page))

            servicePage.editPage(formData)
                .then(res =>
                    this.setState({
                        page : res,
                        alert : 'Page saved ...'
                    })
                )

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

        const { page, subcategory_page, editor_text, alert } = this.state

        const intro_category_text = editor_text === 'intro_category_text' ?
            <EditorText editorState = { page.intro_category_text ? page.intro_category_text : page.productType.description } editor = {this.handleTextChange} />
            :
            <p className="category_text" onClick={ () => this.handleTextClick('intro_category_text') }>
                { page.intro_category_text ? page.intro_category_text : page.productType.description }
            </p>

        const subcategory = subcategory_page &&

            subcategory_page.map( subcategory =>
                    <div className="col-sm-6 col-md-3" key={subcategory._id}>
                        <Link className="list_subcategory_item" to={`/website/` + page.page_name + `/`+ subcategory.page_name }>
                            <img className="subcategory_item_img" src={ subcategory.page_img ? require('../../../assets/img/page/'+ subcategory.page_img) : require('../../../assets/img/page/default_image.png')  }/>
                            <h2 className="subcategory_item_title">{ subcategory.page_name }</h2>
                        </Link>
                    </div>
            )


        return (
           <div className="container">
               <div className="breadcrumb">
                   <Link to={'/'} className="navigation_page"> Home </Link>
                   <span className="navigation_pipe">/</span>
                   <span className="navigation_page"> { page.page_name } </span>
               </div>
               <div className="category_intro">
                   <h1 className="category_name">
                       { page.page_name }
                   </h1>

                   { intro_category_text }

               </div>
               <div className="category_list_subcategory">
                   <div className="row">
                       { subcategory }
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

export default Category;
