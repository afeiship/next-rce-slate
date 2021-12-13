import Code from '@jswork/slate-plugin-code';
import { Button } from '@jswork/react-rte-ui';
import React from 'react';

export default (props) => {
  const { editor } = props;
  return <Button
    active={Code.commands.is(editor)}
    tooltip='代码'
    onMouseDown={() => Code.commands.toggle(editor, true)}>
    <i className='wsui-icon-code' />
  </Button>;
}
