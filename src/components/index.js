import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createEditor } from 'slate';
import nxCompose from '@jswork/next-compose';
import NxSlateSerialize from '@jswork/next-slate-serialize';
import NxDeslateSerialize from '@jswork/next-slate-deserialize';
import NxSlateDefaults from '@jswork/next-slate-defaults';
import deepEqual from 'fast-deep-equal';
import {
  Slate,
  Editable,
  withReact,
  DefaultElement,
  DefaultLeaf
} from 'slate-react';

const CLASS_NAME = 'react-rte-slate';
const DEFAULT_ELEMENTS = {
  element: DefaultElement,
  leaf: DefaultLeaf
};

export default class ReactRteSlate extends Component {
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
    value: PropTypes.string,
    /**
     * Header for editor.
     */
    header: PropTypes.any,
    /**
     * Footer for editor.
     */
    footer: PropTypes.any,
    /**
     * The change handler.
     */
    onChange: PropTypes.func,
    /**
     * The plugin changed handler.
     */
    onPluginChange: PropTypes.func,
    /**
     * The hanlder when editor init.
     */
    onInit: PropTypes.func,
    /**
     * Plugin list.
     */
    plugins: PropTypes.array
  };

  static defaultProps = {
    value: '',
    onChange: noop,
    onPluginChange: noop,
    onInit: noop,
    plugins: []
  };


  get withDecorators() {
    const { plugins } = this.props;
    const decorators = plugins.map((plugin) => plugin.decorator).filter(Boolean);
    return nxCompose(withReact, ...decorators);
  }

  get hooks() {
    const { plugins } = this.props;
    return plugins.filter((plugin) => plugin.hooks);
  }

  renderHooks(inRole, inProps) {
    const DefaultComponent = DEFAULT_ELEMENTS[inRole];
    const handlers = this.hooks.map((item) => item.hooks[inRole]).filter(Boolean);
    const handler = handlers.find((fn) => fn(this, inProps));
    return handler ? handler(this, inProps) : <DefaultComponent {...inProps} />;
  }

  toSlateNodes(inValue) {
    return this.handleSerialize('importer', inValue);
  }

  constructor(inProps) {
    super(inProps);
    const { value, onInit } = inProps;
    const composite = this.withDecorators;
    this.initialValue = this.toSlateNodes(value);
    this.editor = composite(createEditor());
    this.state = { value: this.initialValue };
    onInit({ target: { value: this.editor } });
  }

  shouldComponentUpdate(inProps){
    const value = this.toSlateNodes(inProps.value);
    if(!deepEqual(this.state.value, value)){
      this.setState({ value });
    }
    return true;
  }

  renderElement = (inProps) => {
    return this.renderHooks('element', inProps);
  };

  renderLeaf = (inProps) => {
    return this.renderHooks('leaf', inProps);
  };

  handleSerialize(inRole, inValue) {
    const { plugins } = this.props;
    const handlers = plugins.map((plugin) => plugin[inRole]).filter(Boolean);
    const Parser = inRole === 'exporter' ? NxSlateSerialize : NxDeslateSerialize;
    const process = (node, children) => {
      const handler = handlers.find((fn) => fn(node, children));
      return handler ? handler(node, children) : NxSlateDefaults[inRole](node, children);
    };
    return Parser.parse(inValue, { process });
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const value = this.handleSerialize('exporter', inEvent);
    const target = { value: inEvent };

    this.setState(target, () => {
      onChange({ target: { value } });
    });
  };

  render() {
    const {
      className,
      value,
      header,
      footer,
      onChange,
      onPluginChange,
      onInit,
      placeholder,
      plugins,
      ...props
    } = this.props;
    const _value = this.state.value;

    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)}>
        <Slate editor={this.editor} value={_value} onChange={this.handleChange}>
          {header}
          <Editable
            placeholder={placeholder}
            renderLeaf={this.renderLeaf}
            renderElement={this.renderElement}
            {...props}
          />
          {footer}
        </Slate>
      </section>
    );
  }
}
