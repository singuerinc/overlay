import * as interactjs from 'interactjs';
import { setPosition } from './setPosition';

export const draggable = (
  el: HTMLElement,
  callback: ({ x, y }: { x: number; y: number }) => void
) => {
  const { innerWidth, innerHeight } = window;

  interactjs(el).draggable({
    onmove: ({ dx, dy, target }) => {
      let x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
      let y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

      x = Math.min(Math.max(0, x), innerWidth - el.clientWidth);
      y = Math.min(Math.max(0, y), innerHeight - el.clientHeight);

      setPosition(el, x, y);

      callback({ x, y });
    }
  });
};
