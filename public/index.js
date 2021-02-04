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
import './assets/style.scss';

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
    this.state = { value: '<p>hello world</p>' };
  }

  handleClick1 = (e) => {
    this.setState({ value: '<p>Are you ok?</p>' });
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
            BackgroundColor
          ]}
          value={this.state.value}
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
