const ReactDom = new Object();
ReactDom.render = function(element, container) {
  const { type, props } = element;
  const { children, ...otherProps } = props;
  console.log('otherProps:', otherProps);
  const node = document.createElement(type)
  for(attr in otherProps) {
    console.log('attr:', attr);
    node[attr] = otherProps[attr];
  }
  const text = document.createTextNode('');
  text.nodeValue = children;
  node.appendChild(text);
  container.append(node);
}
export default ReactDom;