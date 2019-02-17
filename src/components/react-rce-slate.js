import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import { Editor } from 'slate-react';
import { Value } from 'slate';

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

function ImageNode(props) {
  return (
    <div {...props.attributes}>
      <img width="100%" src="https://via.placeholder.com/200x100" />
      <p>{props.children}</p>
    </div>
  );
}

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: null,
    onChange: noop
  };
  /*===properties end===*/

  constructor(inProps) {
    super(inProps);
    this.state = {
      value: Value.fromJSON({
        document: {
          nodes: [
            {
              object: 'block',
              type: 'paragraph',
              nodes: [
                {
                  object: 'text',
                  leaves: [
                    {
                      text: 'A line of text in a paragraph.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      })
    };
  }

  onChange = ({ value }) => {
    console.log('value: ->', value);
    this.setState({ value });
  };

  // Define a new handler which prints the key that was pressed.
  onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next();
    console.log(event.key);
    switch (event.key) {
      case 'b':
        event.preventDefault();
        editor.toggleMark('bold');
        break;
      case 'u':
        event.preventDefault();
        editor.toggleMark('underline');
        break;
      case 'i':
        event.preventDefault();
        editor.insertBlock('image');
        break;
      case '`':
        const isCode = editor.value.blocks.some((block) => block.type == 'code');
        event.preventDefault();
        editor.setBlocks(isCode ? 'paragraph' : 'code');
        break;
      // Otherwise, let other plugins handle it.
      default:
        return next();
    }
  };

  renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />;
      case 'image':
        return <ImageNode {...props} />;
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong {...props} />;
      case 'underline':
        return <span style={{ textDecoration: 'underline' }} {...props} />;
      default:
        return next();
    }
  };

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('react-rce-slate', className)} {...props}>
        <p>Ctrl + `/u/i/b</p>
        <Editor
          className="react-rce-slate-editor"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}
