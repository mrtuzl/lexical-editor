import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  $getSelection, 
  $isRangeSelection, 
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND, 
  REDO_COMMAND 
} from 'lexical';
import { 
  INSERT_UNORDERED_LIST_COMMAND, 
  INSERT_ORDERED_LIST_COMMAND, 
  REMOVE_LIST_COMMAND 
} from '@lexical/list';
import { 
  TOGGLE_LINK_COMMAND,
  $isLinkNode,
} from '@lexical/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faStrikethrough, faListUl, faListOl, faLink, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const applyFormat = (format) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
      }
    });
  };

  const applyElementFormat = (format) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
      }
    });
  };

  const insertUnorderedList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
  };

  const insertOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
  };

  const removeList = () => {
    editor.dispatchCommand(REMOVE_LIST_COMMAND);
  };

  const toggleLink = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const isLink = selection.getNodes().some(node => $isLinkNode(node));
      const url = isLink ? null : prompt('Enter the URL');
      if (url !== null) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    }
  };

  return (
    <div className="toolbar">
      <button onClick={() => applyFormat('bold')} title="Bold"><FontAwesomeIcon icon={faBold} /></button>
      <button onClick={() => applyFormat('italic')} title="Italic"><FontAwesomeIcon icon={faItalic} /></button>
      <button onClick={() => applyFormat('underline')} title="Underline"><FontAwesomeIcon icon={faUnderline} /></button>
      <button onClick={() => applyFormat('strikethrough')} title="Strikethrough"><FontAwesomeIcon icon={faStrikethrough} /></button>
      <button onClick={insertUnorderedList} title="Bullet List"><FontAwesomeIcon icon={faListUl} /></button>
      <button onClick={insertOrderedList} title="Number List"><FontAwesomeIcon icon={faListOl} /></button>
      <button onClick={removeList} title="Remove List"><FontAwesomeIcon icon={faListUl} /></button>
      <button onClick={toggleLink} title="Link"><FontAwesomeIcon icon={faLink} /></button>
      <button onClick={() => applyElementFormat('left')} title="Align Left"><FontAwesomeIcon icon={faAlignLeft} /></button>
      <button onClick={() => applyElementFormat('center')} title="Align Center"><FontAwesomeIcon icon={faAlignCenter} /></button>
      <button onClick={() => applyElementFormat('right')} title="Align Right"><FontAwesomeIcon icon={faAlignRight} /></button>
      <button onClick={() => applyElementFormat('justify')} title="Justify"><FontAwesomeIcon icon={faAlignJustify} /></button>
      <button onClick={() => editor.dispatchCommand(UNDO_COMMAND)} title="Undo"><FontAwesomeIcon icon={faUndo} /></button>
      <button onClick={() => editor.dispatchCommand(REDO_COMMAND)} title="Redo"><FontAwesomeIcon icon={faRedo} /></button>
    </div>
  );
};

export default Toolbar;