import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { basename, extname, join } from 'node:path'

/**
 * List of allowed file extensions
 */
const fileExtensionWhitelist = [
  '.woff2',
  '.svg',
  '.img',
  '.jpg',
  '.jpeg',
  '.png',
]

/**
 * Copy file from source to destination
 *
 * @param source - Source path
 * @param target - Destination path
 * @returns
 */
function copyFileSync(source: string, target: string) {
  let targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (existsSync(target)) {
    if (lstatSync(target).isDirectory()) {
      targetFile = join(target, basename(source))
    }
  }

  if (!fileExtensionWhitelist.includes(extname(source))) {
    return
  }

  const _readFileSync = readFileSync(source)
  const arrayBufferView = new Uint8Array(
    _readFileSync.buffer,
    _readFileSync.byteOffset,
    _readFileSync.byteLength
  )
  writeFileSync(targetFile, arrayBufferView)
}

/**
 * Recursively copy directory from source to destination
 *
 * @param source - source directory
 * @param target - destination directory
 */
function copyFolderRecursiveSync(source: string, target: string) {
  let files = []

  // Check if folder needs to be created or integrated
  const targetFolder = join(target, basename(source))
  if (!existsSync(targetFolder)) {
    mkdirSync(targetFolder)
  }

  // Copy
  if (lstatSync(source).isDirectory()) {
    files = readdirSync(source)
    for (const file of files) {
      const curSource = join(source, file)
      if (lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    }
  }
}

/**
 * Copy asset directory from source to destination
 *
 * @param assetDir - destination directory
 * @param assets - source directory
 */
export const copyAssets = (assetDir: string, assets: string) => {
  if (!existsSync(assetDir)) {
    mkdirSync(assetDir, { recursive: true })
  }
  copyFolderRecursiveSync(assets, assetDir)
}
