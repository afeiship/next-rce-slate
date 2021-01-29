import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Editor, createEditor } from 'slate';
import nxCompose from '@jswork/next-compose';
import { jsx } from 'slate-hyperscript';
import NxSlateSerialize from '@jswork/next-slate-serialize';
import NxDeslateSerialize from '@jswork/next-slate-deserialize';

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
  importer?: any;
  exporter?: any;
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
const DEFAULT_ELEMENTS = {
  element: DefaultElement,
  leaf: DefaultLeaf
};

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
    const decorators = plugins.filter((plugin) => plugin.decorator);
    return nxCompose(...decorators, withReact);
  }

  private get hooks() {
    const { plugins } = this.props;
    return plugins.filter((plugin) => plugin.hooks);
  }

  private renderHooks(inRole: string, inProps: any) {
    const DefaultComponent = DEFAULT_ELEMENTS[inRole];
    const handlers = this.hooks.map((item) => item!.hooks![inRole]).filter(Boolean);
    const handler = handlers.find((fn) => fn(this, inProps));
    return handler ? handler(this, inProps) : <DefaultComponent {...inProps} />;
  }

  protected exporter(inNode, inChildren) {
    if (!inChildren) return inNode.text;
    switch (inNode.type) {
      case 'paragraph':
        return `<p>${inChildren}</p>`;
      default:
        return inChildren;
    }
  }

  protected importer(inElement, inChildren) {
    const nodeName = inElement.nodeName.toLowerCase();
    switch (nodeName) {
      case 'body':
        return jsx('fragment', {}, inChildren);
      case 'br':
        return '\n';
      case 'blockquote':
        return jsx('element', { type: 'quote' }, inChildren);
      case 'p':
        return jsx('element', { type: 'paragraph' }, inChildren);
      default:
        return inElement.textContent;
    }
  }

  public constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    const composite = this.withDecorators;
    this.editor = composite(createEditor());
    this.state = { value };

    // todo: test code
    window['Editor'] = Editor;
    window['context'] = this;
  }

  public renderElement = (inProps: RenderElementProps) => {
    return this.renderHooks('element', inProps);
  };

  public renderLeaf = (inProps: RenderLeafProps) => {
    return this.renderHooks('leaf', inProps);
  };

  // to-html/from-html
  public handleSerialize(inRole) {
    const { plugins } = this.props;
    const { value } = this.state;
    const handlers = plugins.map((plugin) => plugin[inRole]);
    const Parser = inRole === 'exporter' ? NxSlateSerialize : NxDeslateSerialize;
    const process = (node, children) => {
      const handler = handlers.find((fn) => fn(node, children));
      return handler ? handler(node, children) : this[inRole](node, children);
    };
    return Parser.parse(value, { process });
  }

  public handleChange = (inEvent) => {
    const { onChange } = this.props;
    const html = this.handleSerialize('exporter');
    const target = { value: inEvent, html };

    this.setState(target, () => {
      onChange({ target });
    });
  };

  public render() {
    const { className, value, onChange, ...props } = this.props;
    const _value = this.state.value;

    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...props}>
        <Slate editor={this.editor} value={_value} onChange={this.handleChange}>
          <Editable renderLeaf={this.renderLeaf} />
        </Slate>
      </section>
    );
  }
}
