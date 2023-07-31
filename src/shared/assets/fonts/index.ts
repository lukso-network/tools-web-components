export const fonts: string = import.meta.url
  .replace(/^file:\/\/|\/\w+\.?[jt]s$/g, '')
  .replace(/\/index\.[a-z]+$/g, '')
