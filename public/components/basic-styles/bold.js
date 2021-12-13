import Bold from '@jswork/slate-plugin-bold';
import { Button } from '@jswork/react-rte-ui';
import React from 'react';

export default (props) => {
  const { editor } = props;
  return <Button
    active={Bold.commands.is(editor)}
    tooltip='加粗'
    onMouseDown={() => Bold.commands.toggle(editor, true)}>
    <i className='wsui-icon-bold' />
  </Button>;
}
