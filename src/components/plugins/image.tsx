import React from 'react';

export const withImage = (editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = element => {
    return element.type === 'image' ? true : isInline(element)
  };
  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  };
  return editor;

};



export const ImageElement = class extends React.Component<any>{
  render() {
    const { attributes, children, element } = this.props;
    return (
      <span {...attributes} >
        <img
          onClick={e => {
            console.log('click image');
          }}
          contentEditable={false} src="https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg" />
        { children}
      </span>
    )
  }
}
