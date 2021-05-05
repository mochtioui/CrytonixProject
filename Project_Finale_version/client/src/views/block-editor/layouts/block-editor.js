import React, {Suspense, Fragment} from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import servicePage from "../../../services/page.service";
import "../assets/block.css"
import SelectLayout from "../select-layout";
import PageEditor from "../page-editor";
import NotFound from "../../../components/404/NotFound";


class BlockEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: '',
            editor: false,
            page: '',
            pageId: props.match.params.pageId
        }
    }

    componentDidMount() {
        servicePage.getPage()
            .then( res => {
                this.setState({
                    pages : res
                });

                if( this.state.pageId ) {
                    this.state.pages.filter(page => page._id === this.state.pageId).forEach(page =>
                        this.setState({
                            page : page
                        })
                    )
                }
            })

    }

    handleSelectLayout = (layout) => {
        this.setState({
            editor: true,
            page : {
                page_name: layout.layout_name,
                layout: layout
            }
        })
    }

    render() {
        const { editor, page, pageId }  = this.state
        return (
            <div className="wrapper-editor">
                {
                    pageId ?
                        ( page ?  <PageEditor page = { page } /> : <NotFound/>  )
                        :
                        (
                            editor  ?  <PageEditor page = { page } /> : <SelectLayout useLayout={ this.handleSelectLayout } />
                        )
                }
            </div>

        );
    }

}

export default BlockEditor;
