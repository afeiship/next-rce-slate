import React, { useEffect, useState } from 'react';

export default {
  name: 'bold',
  hooks: {
    element: (inContext, inProps) => {
      const { attributes, children, leaf } = inProps;
      if (!leaf.bold) return null;
      return <strong {...attributes}>{children}</strong>;
    }
  }
};
