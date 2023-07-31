export const assets: string = import.meta.url
  .replace(/^file:\/\/|\/\w+\.?[jt]s$/g, '')
  .replace(/\/index\.[a-z]+$/g, '')
export { fonts } from './fonts'
export { images } from './images'
