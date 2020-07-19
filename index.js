// const element = <h1 title="foo">Hello</h1>
import ReactDom from './react-dom';
const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'Hello'
  },
};
const container = document.getElementById('root');
ReactDom.render(element, container)