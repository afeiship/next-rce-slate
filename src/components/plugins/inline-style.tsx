import { useEffect, useState } from 'react';

export default {
  name: 'inline-style',
  hooks: {
    leaf: (inContext, inProps) => {
      const { attributes, children, leaf } = inProps;
      if (!leaf.inlineStyle) return null;
      const [inlineStyle, setInlineStyle] = useState(leaf.inlineStyle);

      useEffect(() => {
        setInlineStyle({ ...inlineStyle, ...leaf.inlineStyle });
      }, [ leaf.inlineStyle ]);

      return (
        <span {...attributes} style={inlineStyle}>
          {children}
        </span>
      );
    }
  }
};
