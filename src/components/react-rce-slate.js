import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import { Editor } from 'slate-react';
import { Value } from 'slate';

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

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classNames('react-rce-slate', className)} {...props}>
        <Editor
          className="react-rce-slate-editor"
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
