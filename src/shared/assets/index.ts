export const assets: string = import.meta.url.replace(
  /^file:\/\/|\/\w+\.?[jt]s$/g,
  ''
)
export { fonts } from './fonts'
export { images } from './images'
