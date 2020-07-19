const ReactDom = new Object();

let nextUnitOfWork = null;
let wipRoot = null;
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitRoot() {
  commitWork(wipRoot.child);
  console.log('root fiber:', wipRoot);
  wipRoot = null;
}
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  if(!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop)
}
console.log('requestIdleCallback');
requestIdleCallback(workLoop)



function performUnitOfWork(fiber) {
  // TODO
  if(!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // remove this part as we dont want brower interrupt rendering
  // if(fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }
  const elements = fiber.props.children || [];
  let preSubling = null;
  elements.forEach((ele, index) => {
    const newFiber = {
      type: ele.type,
      props: ele.props,
      parent: fiber, 
    };
    if(index === 0) {
      fiber.child = newFiber;
    }else {
      // preSubling.sibling = newFiber;  
    }
    // preSubling = newFiber;
    console.log('preSubling:', preSubling);
  })

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }

}

function createDom(fiber) {
  const { type, props } = fiber;
  const { children, ...otherProps } = props;
  const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type);
  Object.keys(otherProps).forEach(propName => {
    console.log('propName:', propName);
    dom[propName] = otherProps[propName];
  });
  return dom;
}                                  

function render(element, container) {
  console.log('render');
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    }
  };
  nextUnitOfWork = wipRoot;
}

ReactDom.render = render;
export default ReactDom;