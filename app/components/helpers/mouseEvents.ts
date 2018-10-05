import * as R from 'ramda';

export function onMouseEnter() {
  const win = require('electron').remote.getCurrentWindow();
  win.setIgnoreMouseEvents(false);
}

export function onMouseLeave() {
  const win = require('electron').remote.getCurrentWindow();
  win.setIgnoreMouseEvents(true, {
    forward: true
  });
}

export function onMouseDown(e: MouseEvent) {
  const { currentTarget } = e;
  const { parentElement } = currentTarget as HTMLElement;
  const { children } = parentElement as HTMLElement;

  const tools = Array.from(children);

  const maxIndex = Math.max.apply(
    Math,
    tools.map(function(t: HTMLElement) {
      console.log('zIndex', t.style.zIndex);
      return parseInt(t.style.zIndex || '0', 10);
    })
  );

  const nextIndex = maxIndex + 1;

  R.forEach((child: Element) => {
    if (child === currentTarget) {
      (child as HTMLElement).style.zIndex = nextIndex;
    }
  }, tools);
}

export function startListeningToIgnoreMouseEvents(el) {
  el.addEventListener('mouseenter', onMouseEnter);
  el.addEventListener('mouseleave', onMouseLeave);
}

export function stopListeningToIgnoreMouseEvents(el) {
  el.removeEventListener('mouseenter', onMouseEnter);
  el.removeEventListener('mouseleave', onMouseLeave);
}

export function startListeningAndSwapZIndex(el) {
  el.addEventListener('mousedown', onMouseDown);
}

export function stopListeningAndSwapZIndex(el) {
  el.addEventListener('mousedown', onMouseDown);
}
