// const element = <h1 title="foo">Hello</h1>
import { createElement } from './react';
import ReactDom from './react-dom';
const element = createElement(
  'div',
  { id: 'foo' },
  createElement('button', { id: 'btn1' }, 'click me' ),
  createElement('a', null, 'link'),
)
console.log('run:', element);
const container = document.getElementById('root');
ReactDom.render(element, container);
