import * as interactjs from 'interactjs';
import { setPosition } from './setPosition';

export const draggable = (
  el: HTMLElement,
  callback: ({ x, y }: { x: number; y: number }) => void
) => {
  interactjs(el).draggable({
    onmove: ({ dx, dy, target }) => {
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

      setPosition(el, x, y);

      callback({ x, y });
    }
  });
};
