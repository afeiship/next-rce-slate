import React from 'react';
import ReactInput from '@jswork/react-input';
import { Editor } from 'slate';
import CodeBlock from '../../plugins/code-block';
import { Toolbar, Button, ButtonGroup } from '@jswork/react-rte-ui';

export default (props) => {
  const { editor } = props;

  return (
    <ButtonGroup>
      <Button
        onClick={(e) => {
          console.log('insert  code block.');
          Editor.insertNode(editor, { type: 'codeblock', lang: 'plain', children: [{ text: '' }] });
        }}>
        CodeBlock
      </Button>
    </ButtonGroup>
  );
};
