# react-rte-slate
> Pure React rich text WYSIWYG editor based on slatejs.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-rte-slate
```

## properties
| Name           | Type   | Required | Default | Description                           |
| -------------- | ------ | -------- | ------- | ------------------------------------- |
| className      | string | false    | -       | The extended className for component. |
| value          | string | false    | ''      | Default value.                        |
| onChange       | func   | false    | noop    | The change handler.                   |
| onPluginChange | func   | false    | noop    | The plugin changed handler.           |
| onInit         | func   | false    | noop    | The handler when editor init.         |
| plugins        | array  | false    | []      | Plugin list.                          |


## usage
1. import css
  ```scss
  @import "~@jswork/react-rte-slate/dist/style.css";

  // or use sass
  @import "~@jswork/react-rte-slate/dist/style.scss";
  @import "~@jswork/react-rte-ui/dist/style.scss";
  @import "~@jswork/wsui-rte-icons";

  // customize your styles:
  $react-rte-slate-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactRteSlate from '@jswork/react-rte-slate';
  import { Toolbar, ButtonGroup, Button } from '@jswork/react-rte-ui';
  import Bold from '@jswork/slate-plugin-bold';
  import Italic from '@jswork/slate-plugin-italic';
  import Underline from '@jswork/slate-plugin-underline';
  import Strikethrough from '@jswork/slate-plugin-strikethrough';
  import Code from '@jswork/slate-plugin-code';
  import Heading from '@jswork/slate-plugin-heading';
  import Blockquote from '@jswork/slate-plugin-blockquote';
  import Color from '@jswork/slate-plugin-color';
  import BackgroundColor from '@jswork/slate-plugin-background-color';
  import BulletedList from '@jswork/slate-plugin-bulleted-list';
  import NumberedList from '@jswork/slate-plugin-numbered-list';
  import ListItem from '@jswork/slate-plugin-list-item';
  import Paragraph from '@jswork/slate-plugin-paragraph';
  import Default from '@jswork/slate-plugin-default';

  import './assets/style.scss';
  import { ReactEditor } from 'slate-react';
  import { createEditor, Editor, Element, Transforms } from 'slate';

  // Alignment: Transforms.setNodes(editor, { style: { textAlign: 'right' } });
  class App extends React.Component {
    get headerView() {
      const editor = this.editor;
      if (!editor) return null;
      return (
        <Toolbar className="wsui-rte-icons">
          <Button
            active={Bold.commands.is(editor)}
            tooltip="加粗"
            onMouseDown={(e) => {
              console.log('e:', e);
              // e.preventDefault();
              Bold.commands.toggle(editor, true);
            }}>
            <i className="wsui-icon-bold" />
          </Button>
          <Button
            active={Italic.commands.is(editor)}
            tooltip="倾斜"
            onClick={(e) => {
              Italic.commands.toggle(editor, true);
            }}>
            <i className="wsui-icon-italic" />
          </Button>
          <Button
            active={Strikethrough.commands.is(editor)}
            tooltip="删除线"
            onClick={(e) => {
              Strikethrough.commands.toggle(editor, true);
            }}>
            <i className="wsui-icon-strikethrough" />
          </Button>
          <Button
            active={Underline.commands.is(editor)}
            tooltip="下滑线"
            onClick={(e) => {
              Underline.commands.toggle(editor, true);
            }}>
            <i className="wsui-icon-underline" />
          </Button>
        </Toolbar>
      );
    }

    constructor(inProps) {
      super(inProps);
      this.state = {
        value: `<p style="text-align:right;">Are <code>you</code> ok?</p><blockquote style="text-align:right;"><span style="font-weight: bold;">hello world</span></blockquote><p><i><u><span style="font-weight: bold;">Are</span></u></i> <span style="color: rgb(255, 0, 0);">you</span> ok?</p><ul><li><u><span>thanks</span></u></li><li>and you?</li></ul>`,
        plugins: [
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Code,
          Heading,
          Blockquote,
          Color,
          BackgroundColor,
          NumberedList,
          BulletedList,
          ListItem,
          // PasteHtml,
          // // ForceLayout,
          // BetterDelete,
          Paragraph
        ]
      };
    }

    handleInit = (e) => {
      this.editor = e.target.value;
      window.editor = this.editor;
      window.Editor = Editor;
      window.ReactEditor = ReactEditor;
      window.Transforms = Transforms;
    };

    handleClick1 = (e) => {
      this.setState({ value: '<p style="text-align:right;">Are you ok?</p>' });
    };

    handleClick2 = (e) => {
      this.setState({
        plugins: [Default]
      });
    };

    render() {
      return (
        <ReactDemokit className="p-3 app-container" url="https://github.com/afeiship/react-rte-slate">
          <button className="button is-primary mb-2 mr-2" onClick={this.handleClick1}>
            Update a value.
          </button>

          <button className="button is-danger mb-2" onClick={this.handleClick2}>
            Update plugins.
          </button>
          { this.headerView }
          <ReactRteSlate
            placeholder="type your text."
            plugins={this.state.plugins}
            value={this.state.value}
            onInit={this.handleInit}
            onChange={(e) => {
              this.setState({ value: e.target.value });
              console.log('html:', e.target.value);
            }}
            className="mb-5"
          />
        </ReactDemokit>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-rte-slate/

## plugins
- [x] slate-plugin-default
- [x] slate-plugin-bold
- [x] slate-plugin-underline
- [x] slate-plugin-color
- [x] slate-plugin-italic
- [x] slate-plugin-code
- [x] slate-plugin-strikethrough

## todo list
- [ ] 最后 export 的html里可能会有一个多余的空的 span 标签
- [ ] paste html 如果<p><blockquote>xxx</p> 会无法成功
- [x] mark/block 元素的 exporter 参数暂时不统一
- [ ] 清空文档
- [ ] 最近2个为空，即插入一个新行
- [ ] shift+enter 强行插入新行
- [ ] 将一个block 分成两个block
- [ ] 删除的时候，只剩下一个 li 标签，比较奇怪。
- [x] 如何在不同的标签上添加 style，text-align: left/right/center 类似对齐功能的完美实现

## resources
- https://stackoverflow.com/questions/65288303/in-slate-styling-an-element-without-changing-his-type

## license
Code released under [the MIT license](https://github.com/afeiship/react-rte-slate/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-rte-slate
[version-url]: https://npmjs.org/package/@jswork/react-rte-slate

[license-image]: https://img.shields.io/npm/l/@jswork/react-rte-slate
[license-url]: https://github.com/afeiship/react-rte-slate/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-rte-slate
[size-url]: https://github.com/afeiship/react-rte-slate/blob/master/dist/react-rte-slate.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-rte-slate
[download-url]: https://www.npmjs.com/package/@jswork/react-rte-slate
