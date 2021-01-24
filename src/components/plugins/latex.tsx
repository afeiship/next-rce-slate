import React from 'react';
import { Viewer } from '@jswork/keypad-quizizz';

import { Transforms, Element as SlateElement } from 'slate';
import { ReactEditor } from 'slate-react';


export const withLatex = (editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = element => {
    return element.type === 'latex' || isInline(element)
  };
  editor.isVoid = element => {
    return element.type === 'latex' || isVoid(element)
  };
  return editor;
};

export const LatexElement = class extends React.Component<any>{
  constructor(inProps) {
    super(inProps);
    const { value } = inProps.element;
    this.state = { value };
  }

  shouldComponentUpdate(inProps) {
    console.log('should update:', inProps);
    return true;
  }

  handleLatexEdit = (inEvent) => {
    const { value } = inEvent.target.dataset;
    const _value = this.state.value;
    // 这段应该放在外面
    const { element, editor } = this.props;
    const pmt = window.prompt('edit?', value);
    const path = ReactEditor.findPath(editor, element)
    const newProperties: Partial<SlateElement> = { value: pmt, };
    Transforms.setNodes(editor, newProperties, { at: path })
    this.setState({ value: pmt || value });
  };

  render() {
    // const { value } = this.props.element;
    const value = this.state.value;
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
