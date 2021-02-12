import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactRteSlate from '../src/main';
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
          onClick={(e) => {
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
        <ReactRteSlate
          header={this.headerView}
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
