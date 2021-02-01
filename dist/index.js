/**
 *  name: @jswork/react-rte-slate
 *  description: Pure React rich text WYSIWYG editor based on slatejs.
 *  homepage: 
 *  version: 1.0.9
 *  date: 2021-02-01T10:15:42.750Z
 *  license: MIT
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@jswork/noop"),require("classnames"),require("prop-types"),require("react"),require("slate"),require("@jswork/next-compose"),require("@jswork/next-slate-serialize"),require("@jswork/next-slate-deserialize"),require("@jswork/next-slate-defaults"),require("slate-react")):"function"==typeof define&&define.amd?define(["exports","@jswork/noop","classnames","prop-types","react","slate","@jswork/next-compose","@jswork/next-slate-serialize","@jswork/next-slate-deserialize","@jswork/next-slate-defaults","slate-react"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).ReactRteSlate={},e.noop,e.classNames,e.PropTypes,e.React,e.slate,e.nxCompose,e.NxSlateSerialize,e.NxDeslateSerialize,e.NxSlateDefaults,e.slateReact)}(this,(function(e,t,r,n,a,o,l,i,u,s,p){"use strict";function f(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var c=f(t),d=f(r),h=f(n),m=f(a),y=f(l),v=f(i),g=f(u),b=f(s),j=function(e,t){return(j=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function w(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}j(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var x=function(){return(x=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function N(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r}var O="react-rte-slate",C={element:p.DefaultElement,leaf:p.DefaultLeaf},k=function(e){function t(t){var r=e.call(this,t)||this;r.editor=null,r.initialValue=[],r.renderElement=function(e){return r.renderHooks("element",e)},r.renderLeaf=function(e){return r.renderHooks("leaf",e)},r.handleChange=function(e){var t=r.props.onChange,n=r.handleSerialize("exporter",e),a={value:e};r.setState(a,(function(){t({target:{value:n}})}))};var n=t.value,a=t.onInit,l=r.withDecorators;return r.initialValue=r.toSlateNodes(n),r.editor=l(o.createEditor()),r.state={value:r.initialValue},a({target:{value:r.editor}}),r}return w(t,e),Object.defineProperty(t.prototype,"withDecorators",{get:function(){var e=this.props.plugins.map((function(e){return e.decorator})).filter(Boolean);return y.default.apply(void 0,function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),a=0;for(t=0;t<r;t++)for(var o=arguments[t],l=0,i=o.length;l<i;l++,a++)n[a]=o[l];return n}([p.withReact],e))},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"hooks",{get:function(){return this.props.plugins.filter((function(e){return e.hooks}))},enumerable:!1,configurable:!0}),t.prototype.renderHooks=function(e,t){var r=this,n=C[e],a=this.hooks.map((function(t){return t.hooks[e]})).filter(Boolean).find((function(e){return e(r,t)}));return a?a(this,t):m.default.createElement(n,x({},t))},t.prototype.toSlateNodes=function(e){return this.handleSerialize("importer",e)},t.prototype.handleSerialize=function(e,t){var r=this.props.plugins.map((function(t){return t[e]})).filter(Boolean);return("exporter"===e?v.default:g.default).parse(t,{process:function(t,n){var a=r.find((function(e){return e(t,n)}));return a?a(t,n):b.default[e](t,n)}})},t.prototype.render=function(){var e=this.props,t=e.className;e.value,e.onChange,e.onPluginChange,e.onInit;var r=e.placeholder;e.plugins;var n=N(e,["className","value","onChange","onPluginChange","onInit","placeholder","plugins"]),a=this.state.value;return m.default.createElement("section",{"data-component":O,className:d.default(O,t)},m.default.createElement(p.Slate,{editor:this.editor,value:a,onChange:this.handleChange},m.default.createElement(p.Editable,x({placeholder:r,renderLeaf:this.renderLeaf,renderElement:this.renderElement},n))))},t.displayName=O,t.version="1.0.9",t.propTypes={className:h.default.string,value:h.default.string,onChange:h.default.func,onPluginChange:h.default.func,onInit:h.default.func,plugins:h.default.array},t.defaultProps={value:"",onChange:c.default,onPluginChange:c.default,onInit:c.default,plugins:[]},t}(a.Component),E=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return w(t,e),t.prototype.render=function(){var e=this.props,t=e.active,r=e.className,n=e.tooltip,a=N(e,["active","className","tooltip"]);return m.default.createElement("button",x({"aria-label":n,"data-balloon-pos":"up",className:d.default({"is-active":t},"react-rte-slate__button",r)},a))},t}(m.default.Component),_=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return w(t,e),t.prototype.render=function(){var e=this.props,t=e.className,r=N(e,["className"]);return m.default.createElement("nav",x({className:d.default("react-rte-slate__button-group",t)},r))},t}(m.default.Component),P=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return w(t,e),t.prototype.render=function(){var e=this.props,t=e.className,r=N(e,["className"]);return m.default.createElement("nav",x({className:d.default("react-rte-slate__toolbar",t)},r))},t}(m.default.Component);e.Button=E,e.ButtonGroup=_,e.Editor=k,e.Toolbar=P,Object.defineProperty(e,"__esModule",{value:!0})}));
