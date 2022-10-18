import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createStaticToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from '@draft-js-plugins/buttons';

const textAlignmentPlugin = createTextAlignmentPlugin();
const staticToolbarPlugin = createStaticToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, textAlignmentPlugin];
const text =
  'Ejemplo de texto';

export default class EditorTexto extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => this.setState({ editorState });

  focus = () => this.editor.focus();

  render() {
    return (
      <div onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => {
            this.editor = element;
          }}
        />
        <Toolbar>
          {
            (externalProps) => (
              <React.Fragment>
                <ItalicButton {...externalProps} />
                <BoldButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <textAlignmentPlugin.TextAlignment {...externalProps} />
              </React.Fragment>
            )
          }
        </Toolbar>
      </div>
    );
  }
}