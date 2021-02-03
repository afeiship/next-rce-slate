import React from 'react';

export default {
  name: 'bold',
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      return (
        <strong {...attributes} data-component="bold">
          {children}
        </strong>
      );
    }
  }
};
