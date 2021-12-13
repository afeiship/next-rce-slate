import Bold from './bold';
import Italic from './italic';
import Strikethrough from './strikethrough';
import Underline from './underline';
import Code from './code';
import { Toolbar, ButtonGroup } from '@jswork/react-rte-ui';
import React from 'react';

export default (props) => {
  const { editor } = props;
  return <ButtonGroup>
    <Bold editor={editor} />
    <Italic editor={editor} />
    <Strikethrough editor={editor} />
    <Underline editor={editor} />
    <Code editor={editor} />
  </ButtonGroup>;
}
