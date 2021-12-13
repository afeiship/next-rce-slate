import { Button } from '@jswork/react-rte-ui';
import React from 'react';
import Underline from '@jswork/slate-plugin-underline';

export default (props) => {
  const { editor } = props;
  return <Button
    active={Underline.commands.is(editor)}
    tooltip='下滑线'
    onClick={(e) => {
      Underline.commands.toggle(editor, true);
    }}>
    <i className='wsui-icon-underline' />
  </Button>;
}
