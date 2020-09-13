import interactjs from 'interactjs';
import { setPositionInDOM } from './impure';

export const draggable = (
    el: HTMLElement,
    callback: ({ x, y }: { x: number; y: number }) => void
) => {
    const { innerWidth, innerHeight } = window;

    interactjs(el).draggable({
        onend: ({ target }) => {
            const x = parseInt(target.getAttribute('data-x'), 10);
            const y = parseInt(target.getAttribute('data-y'), 10);

            setPositionInDOM(el, x, y);

            callback({ x, y });
        },
        onmove: ({ dx, dy, target }) => {
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

            x = Math.min(Math.max(0, x), innerWidth - el.clientWidth);
            y = Math.min(Math.max(0, y), innerHeight - el.clientHeight);

            setPositionInDOM(el, x, y);

            callback({ x, y });
        }
    });
};
