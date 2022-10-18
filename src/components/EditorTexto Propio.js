import React, { useState, useCallback, useRef } from "react"
import { Editor, EditorState, RichUtils, Modifier } from "draft-js"

export default function EditorTexto() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);
  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return "handled"
    }
    return "not-handled"
  });

  function focusEditor() {
    editor.current.focus();
  };

  const onEditorStateChange = useCallback(
    (rawcontent) => {
      setEditorState(rawcontent.blocks[0].text);
    },
    [editorState]
  ); 

  const _onBoldClick = useCallback(() => {
    this.setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
  });

  const _onUnderlineClick = useCallback(() => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
  });

  const _onItalicClick = useCallback(() => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
  });

  const alignmentStyles = ['left', 'right', 'center'];
  const applyAlignment = (newStyle) => {
      let styleForRemove = alignmentStyles.filter(style => style !== newStyle);
      let currentContent = editorState.getCurrentContent();
      let selection = editorState.getSelection();
      let focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
      let anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
      let isBackward = selection.getIsBackward();
  
      let selectionMerge = {
        anchorOffset: 0,
        focusOffset: focusBlock.getLength(),
      };
  
      if (isBackward) {
        selectionMerge.anchorOffset = anchorBlock.getLength();
      }
      let finalSelection = selection.merge(selectionMerge);
      let finalContent = styleForRemove.reduce((content, style) => Modifier.removeInlineStyle(content, finalSelection, style), currentContent);
      let modifiedContent = Modifier.applyInlineStyle(finalContent, finalSelection, newStyle);
      const nextEditorState = EditorState.push(editorState, modifiedContent, 'change-inline-style');
      setEditorState(nextEditorState);
    };

  return (
    <div
        style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
        onClick={focusEditor}
    >
        <button onClick={_onBoldClick}><b>B</b></button>
        <button onClick={_onUnderlineClick}><u>U</u></button>
        <button onClick={_onItalicClick}><i>I</i></button>
        <button onMouseDown={() => applyAlignment('left')}>LEFT</button>
        <button onMouseDown={() => applyAlignment('center')}>CENTER</button>
        <button onMouseDown={() => applyAlignment('right')}>RIGHT</button>
        <Editor 
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onEditorStateChange}
            // blockStyleFn={blockStyleFn}
            ref={editor}
        />
    </div>
  );

}
