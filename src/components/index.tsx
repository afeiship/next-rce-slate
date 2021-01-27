import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { Transforms, Editor, Element, createEditor } from 'slate';
import ReactSelect from '@feizheng/react-select';

// inner components
import Button from './atomics/button';
import ButtonGroup from './atomics/button-group';
import Toolbar from './atomics/toolbar';
import { toHtml, fromHtml } from './utilities/to-html';

import { withImage, ImageElement } from './plugins/image';
import { withLatex, LatexElement } from './plugins/latex';

export type Props = { className: string; value: Array<any>; onChange: Function };

const CLASS_NAME = 'react-rte-slate';

const DEFAULT_VALUE = [{ type: 'paragraph', children: [{ text: '' }] }];

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
    value: DEFAULT_VALUE,
    onChange: noop
  };

  private editor: any = null;

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    this.editor = withLatex(withImage(withReact(createEditor())));
    this.state = {
      value
    };
  }

  render() {
    const { className, value, onChange, ...props } = this.props;
    const _value = this.state.value;
    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...props}>
        <Slate editor={this.editor} value={_value} onChange={this.handleChange}>
          <Editable renderLeaf={this.renderLeaf} renderElement={this.renderElement} />
        </Slate>
      </section>
    );
  }
}
