# plugin


## schema
```js
{
  id: '插件唯一标识',
  type: '类型', // format/block/extension
  disabled: false,
  meta: {
    title: '标题',
    description:'描述',
    // 其它自定义
  },
  decorator:{
    instance: (inEditor) => {
      return inEditor;
    },
    classify: (inEditor) => {
      return inEditor;
    },
  },
  serialize:{
    input:(props) => {
      console.log('当前插件输出的HTML结构');
    },
    output:(props) => {
      console.log('当前插件输入到HTML解析的jsx');
    },
  },
  command:{
    is: ()=>{},
    active: ()=>{},
    deactive: ()=>{},
    toggle: ()=>{}
  },
  event:{
    keydown:(event)=>{},
    paste:(event)=>{}
  },
  render:(context, props){
    // 显示的样子
    const { editor } = context;
  },
}
```
