import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createEditor, Editor, Element, Transforms } from 'slate';
import nx from '@jswork/next';
import nxCompose from '@jswork/next-compose';
import NxSlateSerialize from '@jswork/next-slate-serialize';
import NxDeslateSerialize from '@jswork/next-slate-deserialize';
import NxSlateDefaults from '@jswork/next-slate-defaults';
import NxCssText from '@jswork/next-css-text';
import NxSlatePlugin from '@jswork/next-slate-plugin';

import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

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
    const instances = plugins.map((plugin) => plugin.decorator.instance);
    return nxCompose(withReact, ...instances);
  }

  constructor(inProps) {
    super(inProps);
    const { onInit } = inProps;
    const html = inProps.value;
    const composite = this.withDecorators;
    const value = this.handleImporter(html);
    this.editor = composite(createEditor());
    this.state = { value };
    onInit({ target: { value: this.editor } });

    window.editor = this.editor;
    window.Editor = Editor;
    window.ReactEditor = ReactEditor;
    window.Transforms = Transforms;
  }

  shouldComponentUpdate(inProps) {
    const html = inProps.value;
    const value = this.handleExporter(this.state.value);
    if (html !== value) {
      this.setState({ value: this.handleImporter(html) });
    }
    return true;
  }

  /**
   * @schema: render(element)
   * @param {*} inProps
   */
  renderElement = (inProps) => {
    const { element, children, attributes } = inProps;
    const { plugins } = this.props;
    const plugin = plugins.find((plg) => plg.id === element.type);
    const style = NxCssText.css2obj(
      nx.get(attributes, 'ref.current.style.cssText')
    );
    const props = {
      element,
      children,
      attributes: nx.mix(null, attributes, {
        style: nx.mix(style, element.style)
      })
    };
    return plugin.render(this, props);
  };

  /**
   * @schema: render(format)
   * @param {*} inProps
   */
  renderLeaf = (inProps) => {
    const { attributes, children, leaf } = inProps;
    const formats = this.getActivePlugin(leaf);
    return (
      <span {...attributes}>
        {formats.reduce((child, plugin) => {
          const props = nx.mix(inProps, { children: child });
          return plugin.render(this, props);
        }, children)}
      </span>
    );
  };

  getActivePlugin(inNode) {
    const { plugins } = this.props;
    return NxSlatePlugin.actived(inNode, plugins);
  }

  handleImporter(inValue) {
    const { plugins } = this.props;
    const handlers = plugins.map((plugin) => plugin.serialize.input);
    const process = (node, children) => {
      const handler = handlers.find((fn) => fn(node, children));
      const input = handler || NxSlateDefaults.importer;
      return input(node, children);
    };
    return NxDeslateSerialize.parse(inValue, { process });
  }

  handleExporter = (inValue) => {
    return NxSlateSerialize.parse(inValue, {
      process: (node, children) => {
        const actived = this.getActivePlugin(node);
        if (!Element.isElement(node)) {
          if (!actived.length) return node.text;
          const el = document.createElement('span');
          el.innerText = node.text;

          const target = actived.reduce((el, plugin) => {
            return plugin.serialize.output({ ...node, el }, children);
          }, el);
          return target.outerHTML;
        }
        return actived.serialize.output(node, children);
      }
    });
  };

  handleChange = (inEvent) => {
    console.log('event:', inEvent);
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
