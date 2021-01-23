import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Slate, Editable, withReact } from 'slate-react'
import { Transforms, Editor, Element, createEditor } from 'slate'
import ReactSelect from '@feizheng/react-select';

// inner components
import Button from './atomics/button';
import ButtonGroup from './atomics/button-group';
import Toolbar from './atomics/toolbar';

import { withImage, ImageElement } from './plugins/image';

export type Props = { className: string; value: Array<any>; onChange: Function };

const CLASS_NAME = 'react-rte-slate';

const MARK_FORMATS = [
  { label: 'B', value: 'bold', hotkey: 'mod+b' },
  { label: 'I', value: 'italic', hotkey: 'mod+i' },
  { label: 'U', value: 'underline', hotkey: 'mod+u' },
  { label: 'S', value: 'strikethrough', hotkey: 'mod+s' },
]

const BLOCK_ITEMS = [
  { label: 'P', value: 'paragraph' },
  { label: 'H1', value: 'h1' },
  { label: 'H2', value: 'h2' },
  { label: 'Blockquote', value: 'blockquote' }
];

const DEFAULT_VALUE = [
  { type: 'paragraph', children: [{ text: '' }] }
];

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
    this.editor = withImage(withReact(createEditor()));
    this.state = {
      value
    };
  }

  isMarkActive = (inFormat) => {
    const marks = Editor.marks(this.editor)
    return marks ? marks[inFormat] === true : false
  };

  isBlockActive = (inFormat) => {
    const [match] = Editor.nodes(this.editor, {
      match: n =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === inFormat,
    });
    return !!match;
  };

  toggleBlock = (inFormat) => {
    const isActive = this.isBlockActive(inFormat)
    const newProperties: Partial<Element> = {
      type: isActive ? 'paragraph' : inFormat,
    }

    Transforms.setNodes(
      this.editor,
      newProperties,
      { match: n => Editor.isBlock(this.editor, n) }
    )
  };

  toggleMark = (inFormat) => {
    const isActive = this.isMarkActive(inFormat)
    if (isActive) {
      Editor.removeMark(this.editor, inFormat);
    } else {
      Editor.addMark(this.editor, inFormat, true);
    }
  }

  handleChange = (inValue) => {
    this.setState({ value: inValue });
  };


  handleBlockChange = (inEvent) => {
    const { value } = inEvent.target;
    this.toggleBlock(value);
  };

  handleMark = (inEvent) => {
    const target = inEvent.target;
    const { format } = target.dataset;
    this.toggleMark(format);
  };


  handleImage = (inEvent) => {
    const text = { text: '' }
    const image = {
      type: 'image',
      url: 'https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
      children: [text]
    };
    Transforms.insertNodes(this.editor, image);
  };

  renderLeaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.strikethrough) {
      children = <s>{children}</s>
    }

    if (leaf.underline) {
      children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
  };

  renderElement = ({ attributes, children, element }) => {
    switch (element.type) {
      case 'blockquote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'h1':
        return <h1 {...attributes}>{children}</h1>
      case 'h2':
        return <h2 {...attributes}>{children}</h2>
      case 'image':
        return <ImageElement {...attributes}>{children}</ImageElement>
      default:
        return <p {...attributes}>{children}</p>
    }
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const _value = this.state.value;
    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...props}>
        <Toolbar>
          <ButtonGroup>
            {MARK_FORMATS.map(item => {
              return (
                <Button
                  key={item.value}
                  active={this.isMarkActive(item.value)}
                  onClick={this.handleMark}
                  data-format={item.value}>
                  {item.label}
                </Button>
              )
            })}
          </ButtonGroup>

          <ButtonGroup>
            <ReactSelect items={BLOCK_ITEMS} onChange={this.handleBlockChange} />
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={this.handleImage}>Image</Button>
          </ButtonGroup>
        </Toolbar>
        <div className={`${CLASS_NAME}__body`}>
          <Slate
            editor={this.editor}
            value={_value}
            onChange={this.handleChange}
          >
            <Editable
              renderLeaf={this.renderLeaf}
              renderElement={this.renderElement}
            />
          </Slate>
        </div>
      </section>
    );
  }
}
