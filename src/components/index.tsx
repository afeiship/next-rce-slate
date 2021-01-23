import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Slate, Editable, withReact } from 'slate-react'
import { Editor, createEditor } from 'slate'


// inner components
import Button from './atomics/button';
import ButtonGroup from './atomics/button-group';
import Toolbar from './atomics/toolbar';

export type Props = { className: string; value: Array<any>; onChange: Function };

const CLASS_NAME = 'react-rte-slate';

const MARK_FORMATS = [
  { label: 'B', value: 'bold', hotkey: 'mod+b' },
  { label: 'I', value: 'italic', hotkey: 'mod+i' },
  { label: 'U', value: 'underline', hotkey: 'mod+u' },
  { label: 'S', value: 'strikethrough', hotkey: 'mod+s' },
]

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

  isMarkActive = (inFormat) => {
    const marks = Editor.marks(this.editor)
    return marks ? marks[inFormat] === true : false
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

  handleMark = (inEvent) => {
    const target = inEvent.target;
    const { format } = target.dataset;
    this.toggleMark(format);
  };

  renderLeaf = ({ attributes, children, leaf }) => {
    console.log('leaf:', leaf);

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
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
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
                  className={classNames({ 'is-active': this.isMarkActive(item.value) })}
                  onClick={this.handleMark}
                  data-format={item.value}>
                    {item.label}
                </Button>
              )
            })}
          </ButtonGroup>

          <ButtonGroup>
            <Button>h1</Button>
            <Button>h2</Button>
            <Button>h3</Button>
            <Button>h4</Button>
            <Button>h5</Button>
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
