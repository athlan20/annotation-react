export function nextTick(fn: Function) {
  setTimeout(fn, 10);
}
