import React from 'react';
import ReactInput from '@jswork/react-input';
import { Editor } from 'slate';
import BackgroundColor from '@jswork/slate-plugin-background-color';

export default (props) => {
  const { editor } = props;
  const value = BackgroundColor.commands.value(editor);

  return (
    <ReactInput
      aria-label="背景色"
      data-balloon-pos="up"
      type="color"
      value={value}
      onChange={(e) => {
        editor && Editor.addMark(editor, 'background-color', e.target.value);
      }}
    />
  );
};
