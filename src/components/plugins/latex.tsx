import React from 'react';
import { Viewer } from '@jswork/keypad-quizizz';

import { Transforms, Element as SlateElement } from 'slate';
import { ReactEditor } from 'slate-react';


export const withLatex = (editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = element => {
    return element.type === 'latex' ? true : isInline(element)
  };
  editor.isVoid = element => {
    return element.type === 'latex' ? true : isVoid(element)
  };
  return editor;
};

export const LatexElement = class extends React.Component<any>{
  constructor(inProps) {
    super(inProps);
    const { value } = inProps.element;
    this.state = { value };
  }

  handleLatexEdit = (inEvent) => {
    const { value } = inEvent.target.dataset;
    console.log(':inEvent.target.dataset', inEvent.target.dataset);

    // const { element, editor } = this.props;
    const pmt = window.prompt('edit?', value);
    // const path = ReactEditor.findPath(editor, element)
    // const newProperties: Partial<SlateElement> = { value: pmt, };
    // // console.log(newProperties);
    // Transforms.setNodes(editor, newProperties, { at: path })
    this.setState({ value: pmt });
  };

  render() {
    // const { value } = this.props.element;
    const value = this.state.value;
    console.log('value:', value);
    return (
      <Viewer
        contentEditable={false}
        value={value}
        data-value={value}
        onClick={this.handleLatexEdit}
      />
    )
  }
}
