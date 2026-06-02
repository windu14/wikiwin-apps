// This polyfill ensures DOMException is available for libraries like Firebase
if (typeof global !== 'undefined' && typeof (global as any).DOMException === 'undefined') {
  (global as any).DOMException = class DOMException extends Error {
    constructor(message?: string, name?: string) {
      super(message);
      this.name = name !== undefined ? name : 'DOMException';
    }
  };
}
