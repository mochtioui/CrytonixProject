import React, {Suspense, Fragment} from 'react';
import { LanguageData } from '../../views/website_editor/language-data';
import onClickOutside from "react-onclickoutside";
import serviceTranslator from "../../services/Translator/translator.service";
import {Button, Modal} from "react-bootstrap";

class Translator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            website: JSON.parse(sessionStorage.getItem('webselect')),
            languages: LanguageData(),
            sourceLang: 'auto',
            targetLang: 'en',
            sourceText: props.sourceText,
            translatedText: ''
        }
    }

    componentDidMount() {
        this.translate()
    }

    handleTranslator = (type, code) => {

        type === 'source' ?
            this.setState({
                sourceLang: code
            }, () => this.translate())
            :
            this.setState({
                targetLang: code
            }, () => this.translate())

    }

    translate() {

        const { sourceText , sourceLang, targetLang } = this.state
        serviceTranslator.translate(sourceText , sourceLang, targetLang).then(res => {
            this.setState({
                sourceLang: res[2],
                translatedText: res[0][0][0]
            })
        })

    }

    handleClose(type) {
        type === 'save' ?
            this.props.save(this.state.translatedText)
            :
            this.props.save()
    }


    render() {

        const { languages, translatedText } = this.state

        const list_language = (type) => languages.map(language =>

             type === 'source' && language.code === this.state.sourceLang ?
                 <div className={ language.code === this.state.sourceLang ? 'item_language active' : 'item_language' }  key={ language.code }>
                     <span className="language_name"> { language.name }</span>
                 </div>
                 :
                 type === 'target' && language.code === this.state.targetLang ?
                     <div className={ language.code === this.state.targetLang ? 'item_language active' : 'item_language' }  key={ language.code }>
                         <span className="language_name"> { language.name }</span>
                     </div>
                     :
                    <div className="item_language" key={ language.code } onClick={ () => this.handleTranslator(type, language.code) }>
                        <span className="language_name"> { language.name }</span>
                    </div>
        )

        const select_language = (type) => languages.map( language =>
            type === 'source' && language.code === this.state.sourceLang ?
                language.name
                :
                type === 'target' && language.code === this.state.targetLang &&
                language.name
        )

        return (
            <Modal show={ true }
                   size="lg"
                   centered
                   onHide={ () => this.handleClose('cancel') }
            >
                <Modal.Body>
                    <div className="content_trans">
                     <div className="trans_header">
                         <div className="select_language dropdown">
                             <span className="btn-toggle dropdown-toggle" data-toggle="dropdown">
                                 { select_language('source') }
                             </span>
                             <div className="list_language dropdown-menu dropdown-menu-left">
                                 { list_language('source') }
                             </div>
                         </div>
                         <img className="revers-icon" src={ require('../../assets/img/sync.png')}/>
                         <div className="select_language dropdown">
                             <span className="btn-toggle dropdown-toggle" data-toggle="dropdown">
                                 { select_language('target') }
                             </span>
                             <div className="list_language dropdown-menu dropdown-menu-left">
                                 { list_language('target') }
                             </div>
                     </div>
                     </div>
                     <p className="trans_text">
                         { translatedText }
                     </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => this.handleClose('cancel') }>
                        Cancel
                    </Button>
                    <Button variant="info" onClick={ () => this.handleClose('save') }>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Translator;
