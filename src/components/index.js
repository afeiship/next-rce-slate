import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createEditor, Editor, Text, Transforms } from 'slate';
import nxCompose from '@jswork/next-compose';
import NxSlateSerialize from '@jswork/next-slate-serialize';
import NxDeslateSerialize from '@jswork/next-slate-deserialize';
import NxSlateDefaults from '@jswork/next-slate-defaults';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';

const CLASS_NAME = 'react-rte-slate';

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
    const decorators = plugins
      .map((plugin) => plugin.decorator)
      .filter(Boolean);
    return nxCompose(withReact, ...decorators);
  }

  get hooks() {
    const { plugins } = this.props;
    return plugins.filter((plugin) => plugin.hooks);
  }

  toSlateNodes(inValue) {
    return this.handleSerialize('importer', inValue);
  }

  constructor(inProps) {
    super(inProps);
    const { onInit } = inProps;
    const html = inProps.value;
    const composite = this.withDecorators;
    const value = this.handleSerialize('importer', html);
    this.editor = composite(createEditor());
    this.state = { value };
    onInit({ target: { value: this.editor } });

    window.editor = this.editor;
    window.Editor = Editor;
    window.Transforms = Transforms;
  }

  shouldComponentUpdate(inProps) {
    const html = inProps.value;
    const value = this.handleExporter(this.state.value);
    if (html !== value) {
      this.setState({ value: this.handleSerialize('importer', html) });
    }
    return true;
  }

  renderElement = (inProps) => {
    const handlers = this.hooks
      .map((item) => item.hooks.element)
      .filter(Boolean);
    const handler = handlers.find((fn) => fn(this, inProps));
    return handler ? handler(this, inProps) : <DefaultElement {...inProps} />;
  };

  renderLeaf = (inProps) => {
    const { attributes, children, leaf } = inProps;
    const activePlugins = this.getActivePlugins(leaf);

    return (
      <span {...attributes}>
        {activePlugins.reduce((child, mark) => {
          const { name, fn } = mark;
          return leaf[name] && fn(this, { ...inProps, children: child });
        }, children)}
      </span>
    );
  };

  getActivePlugins(inNode) {
    const { plugins } = this.props;
    const results = [];
    for (let key in inNode) {
      if (key === 'text') continue;
      const plugin = plugins.find((plugin) => plugin.name === key);
      plugin &&
        results.push({
          name: plugin.name,
          fn: plugin.hooks.leaf,
          exporter: plugin.exporter,
          importer: plugin.importer
        });
    }
    return results;
  }

  handleSerialize(inRole, inValue) {
    const { plugins } = this.props;
    const handlers = plugins.map((plugin) => plugin[inRole]).filter(Boolean);
    const Parser =
      inRole === 'exporter' ? NxSlateSerialize : NxDeslateSerialize;
    const process = (node, children) => {
      const handler = handlers.find((fn) => fn(node, children));
      return handler
        ? handler(node, children)
        : NxSlateDefaults[inRole](node, children);
    };
    return Parser.parse(inValue, { process });
  }

  handleExporter = (inValue) => {
    return NxSlateSerialize.parse(inValue, {
      process: (node, children) => {
        const activePlugins = this.getActivePlugins(node);
        // textNode
        if (!children) {
          // pure text:
          if (!activePlugins.length) return node.text;
          const el = document.createElement('span');
          el.innerText = node.text;
          const target = activePlugins.reduce((el, mark) => {
            const { exporter, name } = mark;
            return node[name] && exporter(el);
          }, el);
          return target.outerHTML;
        } else {
          // element
          const { plugins } = this.props;
          const target = plugins.find((plugin) => plugin.name === node.type);
          return target
            ? target.exporter(node, children)
            : NxSlateDefaults.exporter(node, children);
        }
      }
    });
  };
  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const value = this.handleExporter(inEvent);
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
      <section
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}>
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
