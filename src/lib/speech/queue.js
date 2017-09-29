export default class Queue {

  constructor() {
    this._list = new Array();
  }

  enqueue(o) {
    this._list.push(o);
  }

  dequeue() {
    if (this._list.length > 0) {
      return this._list.shift();
    }
    return null;
  }

  peek() {
    return this._list[0];
  }

  clear() {
    this._list = [];
  }

  size() {
    return this._list.length;
  }

  toString() {
    return '[' + this._list.join(',') + ']';
  }
}
