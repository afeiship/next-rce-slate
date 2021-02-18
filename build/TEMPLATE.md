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
__GENERATE_DOCS__

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
__GENERATE_DAPP__
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
- [x] slate-plugin-heading
- [x] slate-plugin-font-size

## todo list
- [ ] 最后 `export` 的html里可能会有一个多余的空的 `span` 标签
- [ ] `paste html` 如果 `<p><blockquote>xxx</p>` 会无法成功
- [x] `mark/block` 元素的 `exporter` 参数暂时不统一
- [ ] 清空文档
- [ ] 最近2个为空，即插入一个新行
- [ ] `shift+enter` 强行插入新行
- [ ] 将一个 `block` 分成两个 `block`
- [ ] 删除的时候，只剩下一个 `li` 标签，比较奇怪。
- [x] 如何在不同的标签上添加 `style，text-align: left/right/center` 类似对齐功能的完美实现

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
