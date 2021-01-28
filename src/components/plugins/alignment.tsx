import { DefaultLeaf } from 'slate-react';

export default {
  name: 'alignment',
  hooks: {
    leaf: (inContext, inProps) => {
      const { attributes, children, leaf } = inProps;

      if (leaf.alignment) {
        const { value } = leaf.alignment;
        return (
          <span {...attributes} style={{ textAlign: value }}>
            {children}
          </span>
        );
      }

      return null;
    }
  }
};
