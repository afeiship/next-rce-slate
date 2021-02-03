import React from 'react';

export default {
  name: 'bold',
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      if (leaf.bold) {
        return (
          <strong {...attributes} data-component="bold">
            {children}
          </strong>
        );
      }
    }
  }
};
