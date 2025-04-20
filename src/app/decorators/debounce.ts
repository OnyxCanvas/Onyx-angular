/**
 * A decorator that delays the execution of a function until after a specified time has elapsed since it was last called.
 * @param ms The delay in milliseconds.
 */
export function Debounce(ms: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    descriptor.value = function (...args: any[]) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
        timeoutId = null;
      }, ms);
    };

    return descriptor;
  };
}
