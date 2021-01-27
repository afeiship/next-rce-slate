import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor, createEditor } from 'slate';
import nxCompose from '@jswork/next-compose';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  DefaultElement,
  DefaultLeaf
} from 'slate-react';

export interface Entity {
  name: string;
  disabled?: boolean;
  decorator?: (editor: Editor) => Editor;
  hooks?: {
    leaf: (context: any, editor: Editor) => JSX.Element | null;
    element: (context: any, editor: Editor) => JSX.Element | null;
  };
}

export interface EventTarget {
  target: {
    path?: string;
    value: Array<any>;
  };
}

export type Props = {
  className?: string;
  value: Array<any>;
  onChange: (event: EventTarget) => void;
  plugins: Array<Entity>;
};

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
    onChange: PropTypes.func,
    /**
     * Plugin list.
     */
    plugins: PropTypes.array
  };

  static defaultProps = {
    value: [{ type: 'paragraph', children: [{ text: '' }] }],
    onChange: noop,
    plugins: []
  };

  private editor: any = null;

  private get withDecorators() {
    const { plugins } = this.props;
    const decorators = plugins.map((plugin) => plugin.decorator);
    return nxCompose(...decorators, withReact);
  }

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    const composite = this.withDecorators;
    this.editor = composite(createEditor());
    this.state = {
      value
    };
  }

  renderElement(inProps: RenderElementProps) {
    return <DefaultElement {...inProps} />;
  }

  renderLeaf(inProps: RenderLeafProps) {
    return <DefaultLeaf {...inProps} />;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target, () => {
      onChange({ target });
    });
  };

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
