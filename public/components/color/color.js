import React from 'react';
import ReactInput from '@jswork/react-input';
import { Editor } from 'slate';
import Color from '@jswork/slate-plugin-color';

export default (props) => {
  const { editor } = props;
  const value = Color.commands.value(editor);

  console.log('value:', value);

  return (
    <ReactInput
      aria-label="前景色"
      data-balloon-pos="up"
      type="color"
      value={value}
      onChange={(e) => {
        editor && Editor.addMark(editor, 'color', e.target.value);
      }}
    />
  );
};
