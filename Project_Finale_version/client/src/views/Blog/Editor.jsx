import React from "react";
import Blog from "./Blog";
import {EditorState , Editor as DraftEditor} from "draft-js";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 function Editor() {
    return(
        <div className="App">
           <h1>Article</h1>
            <CKEditor
                editor={ ClassicEditor }
                data="<p>Hello from CKEditor 5!</p>"

            />
        </div>
    )
 }
export default Editor;
