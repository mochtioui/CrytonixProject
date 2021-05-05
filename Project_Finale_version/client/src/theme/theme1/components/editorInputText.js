import React, {Suspense} from 'react';
import '../css/Style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'
import Translator from "../../../components/Translator/translator";
import {Modal} from "react-bootstrap";
import {ContentState, EditorState} from "draft-js";


class EditorInputText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: props.editorState,
            translator: false
        };

    }

    saveClick() {
        this.props.editor(this.state.editorState)
    }

    handleTextChange = (event) => {
        this.setState({
            editorState: event.target.value,
        });
    }

    saveTranslator = (translatedText) => {
        translatedText &&
        this.setState({
            editorState: translatedText
        })

        this.setState({
            translator: false
        })
    }

    render() {
        const { editorState, translator } = this.state
        return (
            <>
                <div className="input_editor_icon">
                   <input type="text" className="form-control editor_input" value={ editorState } onChange={ this.handleTextChange } defaultValue={ editorState }   style={{width: `${10*(editorState.length)+ 10}px`}}/>
                    {
                        editorState &&
                        <span className="btn_trans" onClick={ () => this.setState({translator: true}) }><i className="nc-icon nc-refresh-69"></i></span>
                    }
                </div>
                <div className="toggle_btn active">
                    <span className="icon_btn" onClick={ () => this.saveClick() }>
                        <i className="nc-icon nc-check-2"></i>
                    </span>
                </div>
                {
                    translator &&
                    <Translator sourceText = { editorState } save = { this.saveTranslator } />
                }
            </>
           );
    }
}

export default EditorInputText;
