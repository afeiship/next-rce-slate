import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createEditor, Editor, Element } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import nx from '@jswork/next';
import nxCompose from '@jswork/next-compose';
import nxDeepAssign from '@jswork/next-deep-assign';
import nxIsEmpty from '@jswork/next-is-empty';
import nxCompactObject from '@jswork/next-compact-object';
import NxSlateSerialize from '@jswork/next-slate-serialize';
import NxSlateDeserialize from '@jswork/next-slate-deserialize';
import NxSlateDefaults from '@jswork/next-slate-defaults';
import NxCssText from '@jswork/next-css-text';
import NxSlatePlugin from '@jswork/next-slate-plugin';

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
     * The change handler.
     */
    onChange: PropTypes.func,
    /**
     * The plugin changed handler.
     */
    onPluginChange: PropTypes.func,
    /**
     * The handler when editor init.
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

  /**
   * @schema: decorator(instance)
   */
  get withDecorator() {
    const { plugins } = this.props;
    const instances = plugins.map((plugin) => plugin.decorator);
    return nxCompose(withReact, ...instances);
  }

  constructor(inProps) {
    super(inProps);
    this.initialStatics();
    const { onInit } = inProps;
    const html = inProps.value;
    const composite = this.withDecorator;
    const value = this.fromHtml(html);
    this.commands = {};
    this.editor = composite(createEditor());
    this.state = { value };
    this.initialSchema();
    onInit({ target: { context: this, value: this.editor } });
  }

  shouldComponentUpdate(inProps) {
    const html = inProps.value;
    const value = this.toHtml(this.state.value);
    if (html !== value) {
      this.setState({ value: this.fromHtml(html) });
    }
    return true;
  }

  /**
   * Get actived plugin by node.
   * @param inNode
   * @returns {*}
   */
  getActivePlugin(inNode) {
    const { plugins } = this.props;
    return NxSlatePlugin.actived(inNode, plugins);
  }

  /**
   * @schema: statics
   */
  initialStatics() {
    const { plugins } = this.props;
    plugins.forEach((plugin) => nx.mix(Editor, plugin.statics));
  }

  /**
   * @schema:(commands/events)
   */
  initialSchema() {
    const { plugins } = this.props;
    NxSlateDefaults.commands(this, plugins);
    NxSlateDefaults.events(this, plugins);
  }

  /**
   * @schema: render(element)
   * @param {*} inProps
   */
  renderElement = (inProps) => {
    const { element, children, attributes } = inProps;
    const plugin = this.getActivePlugin(element);
    const style = NxCssText.css2obj(nx.get(attributes, 'ref.current.style.cssText'));
    const attrs = nx.mix(
      null,
      attributes,
      nxCompactObject({ style: nx.mix(style, element.style) }, nxIsEmpty)
    );
    const props = { element, children, attributes: attrs };
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

  /**
   * @schema: serialize(input)
   */
  fromHtml(inValue) {
    const { plugins } = this.props;
    const handlers = plugins.map((plugin) => plugin.serialize.input);
    const process = (node, children) => {
      const style = NxSlateDefaults.style(node.style.cssText);
      const args = [{ el: node, style }, children];
      const handler = handlers.find((fn) => fn.apply(null, args));
      const input = handler || NxSlateDefaults.input;
      return input.apply(null, args);
    };
    return NxSlateDeserialize.parse(inValue, { process });
  }

  /**
   * @schema: serialize(output)
   */
  toHtml = (inValue) => {
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
        return actived.serialize.output(
          { ...node, style: NxSlateDefaults.style(node.style) },
          children
        );
      }
    });
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const value = this.toHtml(inEvent);
    const target = { value: inEvent };
    this.setState(target, () => {
      onChange({ target: { value } });
    });
  };

  handleKeyDown = (inEvent) => {
    const { plugins } = this.props;
    plugins.forEach((plugin) => {
      plugin.events.keydown(this, inEvent);
    });
  };

  render() {
    const {
      className,
      value,
      onChange,
      onPluginChange,
      onInit,
      placeholder,
      plugins,
      ...props
    } = this.props;

    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)}>
        <Slate editor={this.editor} value={this.state.value} onChange={this.handleChange}>
          <Editable
            placeholder={placeholder}
            renderLeaf={this.renderLeaf}
            renderElement={this.renderElement}
            onKeyDown={this.handleKeyDown}
            {...props}
          />
        </Slate>
      </section>
    );
  }
}
