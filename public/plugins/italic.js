export default {
  name: 'italic',
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      if (leaf.italic) {
        return (
          <em {...attributes} data-component="italic">
            {children}
          </em>
        );
      }
    }
  }
};
