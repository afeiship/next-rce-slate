import React from 'react';

export default {
  name: 'italic',
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      return (
        <em {...attributes} data-component="italic">
          {children}
        </em>
      );
    }
  }
};
