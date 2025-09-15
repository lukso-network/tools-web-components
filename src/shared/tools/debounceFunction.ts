/**
 * Debounce function execution to prevent multiple calls in a short period of time.
 *
 * @param func
 * @param timeout
 */
export const debounceFunction = (func: unknown, timeout = 100) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      typeof func === 'function' && func.apply(this, args)
    }, timeout)
  }
}
