import fs from 'node:fs'
import path from 'node:path'

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
function copyFileSync(source, target) {
  let targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  if (!fileExtensionWhitelist.includes(path.extname(source))) {
    return
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

/**
 * Recursively copy directory from source to destination
 *
 * @param source - source directory
 * @param target - destination directory
 */
function copyFolderRecursiveSync(source, target) {
  let files = []

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

/**
 * Copy asset directory from source to destination
 *
 * @param assetDir - destination directory
 * @param assets - source directory
 */
export const copyAssets = (assetDir: string, assets: any) => {
  if (!fs.existsSync(assetDir)) {
    fs.mkdirSync(assetDir, { recursive: true })
  }
  copyFolderRecursiveSync(assets, assetDir)
}
