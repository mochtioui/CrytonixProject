import React, {Suspense} from 'react';
import '../css/Style.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import onClickOutside from 'react-onclickoutside'
import Translator from "../../../components/Translator/translator";
import serviceTranslator from "../../../services/Translator/translator.service";


class EditorText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(props.editorState)),
            translator: false
        };

    }

    saveClick() {
       this.props.editor(this.state.editorState.getCurrentContent().getPlainText())
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    saveTranslator = (translatedText) => {
        translatedText &&
            this.setState({
                editorState: EditorState.createWithContent(ContentState.createFromText(translatedText))
            })

        this.setState({
            translator: false
        })
    }

    render() {
        const { editorState, translator } = this.state
        return (
           <div className="editor_text">
               <Editor
               wrapperClassName="wrapper-class"
               editorClassName="editor-class"
               toolbarClassName="toolbar-class"
               toolbar={{
                   inline: {inDropdown: true},
                   list: {inDropdown: true},
                   textAlign: {inDropdown: true},
                   link: {inDropdown: true},
                   history: {inDropdown: true},
               }}
               editorState={editorState}
               onEditorStateChange={this.onEditorStateChange}/>
               {
                   translator ?
                       <Translator sourceText = { editorState.getCurrentContent().getPlainText() } save = { this.saveTranslator } />
                       :
                       editorState.getCurrentContent().getPlainText() &&
                       <span className="btn_translate" onClick={ () => this.setState({ translator : true })} >Translator</span>
               }
               <div className="toggle_btn">
                    <span className="icon_btn" onClick={ () => this.saveClick() } >
                        <i className="nc-icon nc-check-2"></i>
                    </span>
               </div>
           </div>
        );
    }
}

export default EditorText;
