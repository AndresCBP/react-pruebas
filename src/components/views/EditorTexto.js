import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  return (
    <div>
      <h1>Editor de texto</h1>
      <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
        <Editor
          toolbar={{
            options: ['inline', 'textAlign'],
            inline: {
              options: ['bold', 'italic', 'underline']
            },
            textAlign: {
              options: ['left', 'center', 'right']
            }
          }}
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
    </div>
  );
}

// .rdw-editor-toolbar {
//   padding: 6px 5px 0;
//   width: fit-content;
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
//   border: 1px solid #000000;
//   border-bottom: 1px #dfdfdf;
//   display: flex;
//   justify-content: end;
//   background: white;
//   flex-wrap: wrap;
//   font-size: 15px;
//   margin-bottom: 5px;
//   -webkit-user-select: none;
//   user-select: none;
// }