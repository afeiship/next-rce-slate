import NxSlatePlugin from '@jswork/next-slate-plugin';

export default NxSlatePlugin.define({
  id: 'clean-content',
  statics: {
    empty: (inEditor) => {
      console.log('empty.');
      return inEditor;
    }
  }
});
