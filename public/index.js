import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactRteSlate from '../src/main';
import { Toolbar, ButtonGroup, Button } from '@jswork/react-rte-ui';
import Bold from './plugins/bold';
import Italic from './plugins/italic';
import Underline from './plugins/underline';
import Strikethrough from './plugins/strikethrough';
import Code from './plugins/code';
import Heading from './plugins/heading';
import Blockquote from './plugins/blockquote';
import Color from './plugins/color';
import BackgroundColor from './plugins/background-color';
import BulletedList from './plugins/bulleted-list';
import NumberedList from './plugins/numbered-list';
import ListItem from './plugins/list-item';
import PasteHtml from './plugins/paste-html';
import ForceLayout from './plugins/force-layout';
import BetterDelete from './plugins/better-delete';
import ExtEditor from './plugins/ext-editor';
import Paragraph from './plugins/paragraph';
import './assets/style.scss';
import { ReactEditor } from 'slate-react';
import { createEditor, Editor, Element, Transforms } from 'slate';

class App extends React.Component {
  get headerView() {
    return (
      <Toolbar className="wsui-rte-icons">
        <ButtonGroup>
          <Button tooltip="左对齐">
            <i className="wsui-icon-align_left" />
          </Button>
          <Button tooltip="居中" active>
            <i className="wsui-icon-align_center" />
          </Button>
          <Button tooltip="右对齐">
            <i className="wsui-icon-align_right" />
          </Button>
          <Button tooltip="右对齐">
            <i className="wsui-icon-align_justify" />
          </Button>
        </ButtonGroup>
      </Toolbar>
    );
  }

  constructor(inProps) {
    super(inProps);
    this.state = {
      value: `<p style="text-align:right;">Are you ok?</p><blockquote><span style="font-weight: bold;">hello world</span></blockquote><p style=""><i><u><span style="font-weight: bold;">Are</span></u></i> you ok?</p><ul><li><u><span>thanks</span></u></li><li>and you?</li></ul>`
    };
  }

  handleClick1 = (e) => {
    var key = ReactEditor.findKey(editor, {
      type: 'paragraph',
      children: [
        {
          text: 'Are you ok?'
        }
      ]
    });
    // Transforms.select(editor, [0,0]);
    // ReactEditor.deselect(editor);
    // ReactEditor.focus(editor);
    // this.setState({ value: '<p>Are you ok?</p>' });
  };

  render() {
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-rte-slate">
        <button className="btn" onClick={this.handleClick1}>
          Update a value.
        </button>
        <ReactRteSlate
          placeholder="type your text."
          header={this.headerView}
          plugins={[
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
            ExtEditor,
            Paragraph
          ]}
          value={this.state.value}
          onInit={(e) => {
            // debug:
            this.editor = e.target.value;
            window.editor = this.editor;
            window.Editor = Editor;
            window.ReactEditor = ReactEditor;
            window.Transforms = Transforms;
          }}
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
