export function onMouseEnter() {
  const win = require("electron").remote.getCurrentWindow();
  win.setIgnoreMouseEvents(false);
}

export function onMouseLeave() {
  const win = require("electron").remote.getCurrentWindow();
  win.setIgnoreMouseEvents(true, {
    forward: true
  });
}

export function startListeningToIgnoreMouseEvents(el) {
  el.addEventListener("mouseenter", onMouseEnter);
  el.addEventListener("mouseleave", onMouseLeave);
}

export function stopListeningToIgnoreMouseEvents(el) {
  el.removeEventListener("mouseenter", onMouseEnter);
  el.removeEventListener("mouseleave", onMouseLeave);
}
