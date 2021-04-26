import React, {Suspense} from 'react';
import '../css/Style.css';
import EditorText from "../components/editorText";
import servicePage from '../../../services/page.service'
import EditorList from "../components/editorList";
import { Link } from "react-router-dom";
import Ads from '../../../components/Ads/Ads'
import '../../../assets/css/ads _theme1.css';
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: props.editor,
            toggle_btn : false,
            page : props.page,
            page_category: '',
            best_category_list_edit : false,
            editor_text : '',
            alert: '',
            user: token && jwt_decode(token).users
        }

    }

    componentDidMount() {
        const page_category = []
        servicePage.getPage()
            .then( res => {
                res.forEach(page => {
                    if ( page.layout.layout_name === 'category' ) {
                        if (this.state.page.best_category_list) {
                            const exist = this.state.page.best_category_list.find((item) => item._id == page._id);
                            if( ! exist ) {
                                page_category.push(page)
                            }
                        } else {
                            page_category.push(page)
                        }
                    }
                })
                this.setState({
                    page_category: page_category
                })
            })
    }

    addCategory = (page) => {
        let category_list = [page]
        if ( this.state.page.best_category_list ) {
            category_list = [...this.state.page.best_category_list , page]
        }
        this.setState({
            page : {
                ...this.state.page,
                best_category_list: category_list
            },
            page_category : this.state.page_category.filter((item) => item._id !== page._id)
        })
    }

    removeCategory = (page) => {
        this.setState({
            page_category : [...this.state.page_category, page],
            page : {
                ...this.state.page,
                best_category_list: this.state.page.best_category_list.filter((item) => item._id !== page._id)
            },
        })
    }

    mouseEnterHandle() {
        this.setState({
            toggle_btn : true,
        })
    }

    mouseLeaveHandle() {
        this.setState({
            toggle_btn : false
        })
    }

    editButtonClick = () => {
        this.setState({
            best_category_list_edit: !this.state.best_category_list_edit
        })
    }

    saveButtonClick = () => {
        this.setState({
            best_category_list_edit: false
        })
        this.savePage()
    }

    handleTextClick = (editor_text) => {

        ( this.state.user.role === 'Freelancer' || this.state.user.role === 'Content Editor' || this.state.user.role === 'Administrator' ) &&
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
        }, () => event && this.savePage())


    }


    savePage() {
        const { page } = this.state

        if ( this.state.editor ) {

            let formData = new FormData();

            formData.append('page',JSON.stringify(page))
            console.log(page)
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
            this.props.handle(page)
        }

    }

    render() {

        const { page, page_category , best_category_list_edit, toggle_btn, editor_text, alert, user} = this.state

        const best_category_text =  editor_text === 'best_category_text' ?
            <EditorText editorState = { page.best_category_text ? page.best_category_text : '' } editor = { this.handleTextChange } />
            :
            <h1 className="best_category_text" onClick={ () => this.handleTextClick('best_category_text') }>
                { page.best_category_text  ? page.best_category_text : 'Title of best category'  }
            </h1>


        const best_category_desc =  editor_text === 'best_category_desc' ?
            <EditorText editorState = { page.best_category_desc ? page.best_category_desc : '' } editor = { this.handleTextChange } />
            :
            <p className="best_category_desc" onClick={ () => this.handleTextClick('best_category_desc') }>
                { page.best_category_desc ? page.best_category_desc : 'Description of best category' }
            </p>

        const toggle = <div className="toggle_btn">
            {
                best_category_list_edit &&
                <span className="icon_btn"  onClick={this.saveButtonClick}>
                             <i className="nc-icon nc-check-2"></i>
                        </span>
            }
            {
                best_category_list_edit === false && toggle_btn &&
                <span className="icon_btn" onClick={this.editButtonClick}>
                            <i className="nc-icon nc-ruler-pencil"></i>
                        </span>
            }

        </div>

        const best_category_list =  page.best_category_list &&
            page.best_category_list.map(page =>
                <div className="col-md-3" key={ page._id}>
                    {
                        best_category_list_edit ?
                            <p className="best_category_item">
                                { page.page_name}
                                <span className="toggle_icon" onClick={ () => this.removeCategory(page) }>
                                    <i className="nc-icon nc-simple-remove"></i>
                                </span>
                            </p>
                            :
                            <Link className="best_category_item" to={ '/website/' +page.page_name}>
                                <img src={ page.page_img ? require('../../../assets/img/page/'+page.page_img) : require('../../../assets/img/page/default_image.png') }/>
                                { page.page_name }
                            </Link>
                    }
                </div>
            )

        return (
            <>
               <Ads/>
                <div className="section-best_category" onMouseEnter={ () => this.mouseEnterHandle() } onMouseLeave={ () => this.mouseLeaveHandle() }>
                    <div className="container">
                        { best_category_text }
                        { best_category_desc }
                        <div className="best_category_list">
                            <div className={ best_category_list?.length && best_category_list_edit === false ? 'list_category' : 'list_category best_category_border'}>
                                {
                                    ( user.role === 'Administrator' || user.role === 'Content director' || user.role === 'Administrator' ) && toggle
                                }
                                <div className="row">
                                    { best_category_list }
                                </div>
                            </div>
                            { best_category_list_edit && <EditorList page_category = { page_category } add={ this.addCategory } /> }
                        </div>
                    </div>
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

export default Home;
