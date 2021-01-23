import React from 'react';
import { Viewer } from '@jswork/keypad-quizizz';

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
  render() {
    const { attributes, children, element } = this.props;
    return (
      <span {...attributes} contentEditable={false}>
        <Viewer value="a^2+b^2" />
        { children}
      </span>
    )
  }
}
