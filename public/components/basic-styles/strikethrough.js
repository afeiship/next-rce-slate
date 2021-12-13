import { Button } from '@jswork/react-rte-ui';
import React from 'react';
import Strikethrough from '@jswork/slate-plugin-strikethrough';

export default (props) => {
  const { editor } = props;
  return <Button
    active={Strikethrough.commands.is(editor)}
    tooltip='删除线'
    onClick={(e) => {
      Strikethrough.commands.toggle(editor, true);
    }}>
    <i className='wsui-icon-strikethrough' />
  </Button>;
}
