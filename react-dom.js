const ReactDom = new Object();
function render(element, container) {
  const { type, props } = element;
  const { children, ...otherProps } = props;
  const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type);
  Object.keys(otherProps).forEach(propName => {
    console.log('propName:', propName);
    dom[propName] = otherProps[propName];
  })
  children.forEach((child) => {
    render(child, dom)
  })
  container.appendChild(dom);
}

ReactDom.render = render;
export default ReactDom;