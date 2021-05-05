import React, {Suspense} from 'react';
import '../../css/Style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button, Modal} from "react-bootstrap";
import Translator from "../../../../components/Translator/translator";
import {ContentState, EditorState} from "draft-js";



class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description : '',
            errors: '',
            translator: '',

        }
    }

    handleChange = (e) => {
        this.setState( {
            description: {
                ...this.state.description,
                [e.target.name] : e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        })
    }

    handleClick = async () => {

        const { description } = this.state

        if ( ! description.title || ! description.text ) {

            await ( ! description.title ) &&
            this.setState({
                errors: {
                    ...this.state.errors,
                    title: 'Title required'
                }
            })

            await ( ! description.text ) &&
            this.setState({
                errors: {
                    ...this.state.errors,
                    text: 'Title required'
                }
            })
        } else {
            this.props.add(description)
        }
    }

    sourceTranslator = (type) => {
        this.setState({
            translator: type
        })
    }

    saveTranslator = async (translatedText) => {

        translatedText &&
        this.setState({
            description: {
                ...this.state.description,
                [this.state.translator] : translatedText
            },
        })

        this.setState({
            translator: ''
        })

    }

    handleClose = () => {
        this.props.hide()
    }

    render() {

        const { errors, translator, description } = this.state
        const { show } = this.props

        return (

           <Modal show={show}
                  size="md"
                  centered
                  onHide={ this.handleClose }
           >
               <Modal.Header closeButton>
                   <Modal.Title>Add description</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   <div className="form-group">
                       <label>Title</label>
                       <div className="input_icon">
                           <input type="text" name="title" value={ description.title } className={ errors.title ? 'form-control border-danger' : 'form-control' } onChange={ this.handleChange }/>
                           {
                               description.title &&
                               <span className="btn_trans" onClick={ () => this.sourceTranslator('title') }><i className="nc-icon nc-refresh-69"></i></span>
                           }
                       </div>
                       {
                           errors.title &&
                           <span className="text-danger small"> { errors.title } </span>
                       }
                   </div>
                   <div className="form-group">
                       <label>Text</label>
                       <div className="input_icon">
                       <textarea name="text" value={ description.text } className={ errors.text ? 'form-control border-danger' : 'form-control' } onChange={ this.handleChange }></textarea>
                           {
                               description.text &&
                               <span className="btn_trans" onClick={ () => this.sourceTranslator('text') }><i className="nc-icon nc-refresh-69"></i></span>
                           }
                       </div>
                       {
                           errors.text &&
                           <span className="text-danger small"> { errors.text } </span>
                       }
                   </div>
               </Modal.Body>
               <Modal.Footer>
                   <Button variant="secondary" onClick={ this.handleClose }>
                       Cancel
                   </Button>
                   <Button variant="info"  onClick={ this.handleClick }>
                       Submit
                   </Button>
               </Modal.Footer>
               {
                   translator &&
                   <Translator sourceText = { description[translator] } save = { this.saveTranslator } />
               }
           </Modal>

        );
    }
}

export default Add;
