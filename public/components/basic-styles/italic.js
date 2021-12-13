import { Button } from '@jswork/react-rte-ui';
import React from 'react';
import Italic from '@jswork/slate-plugin-italic';

export default (props) => {
  const { editor } = props;
  return <Button
    active={Italic.commands.is(editor)}
    tooltip='倾斜'
    onClick={(e) => Italic.commands.toggle(editor, true)}>
    <i className='wsui-icon-italic' />
  </Button>;
}
