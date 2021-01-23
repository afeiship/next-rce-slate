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

export const ImageElement = ({ attributes, children, element }) => {
  return (
    <span {...attributes} >
      <img
        contentEditable={false} src="https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg" />
      { children}
    </span>
  )
}
