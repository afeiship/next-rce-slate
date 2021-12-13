import { Toolbar, Button, ButtonGroup } from '@jswork/react-rte-ui';
import React from 'react';
import BgColor from './background-color';
import Color from './color';

export default (props) => {
  const { editor } = props;

  return (
    <ButtonGroup>
      <BgColor editor={editor} />
      <Color editor={editor} />
    </ButtonGroup>
  );
};
