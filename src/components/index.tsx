import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'


export type Props = { className: string; value: Array<any>; onChange: Function };

const CLASS_NAME = 'react-rte-slate';

export default class ReactRteSlate extends Component<Props, any> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * Default value.
     */
    value: PropTypes.array,
    /**
     * The change handler.
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: [],
    onChange: noop
  };

  private editor: any = null;

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    this.editor = withReact(createEditor());
    this.state = {
      value
    };
  }

  handleChange = (inValue) => {
    console.log('editor change:', inValue);
    this.setState({ value: inValue });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const _value = this.state.value;
    return (
      <Slate
        editor={this.editor}
        value={_value}
        onChange={this.handleChange}
        data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...props}
      >
        <Editable />
      </Slate>
    );
  }
}
