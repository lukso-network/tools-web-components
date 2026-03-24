import fs from 'fs'
import path from 'path'

/** Read a file as UTF-8 text; throws if the file does not exist. */
export function read(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8')
}

/** Read a file as UTF-8 text; returns an empty string if the file does not exist. */
export function readSafe(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}

/** Write content to a file, creating parent directories as needed. */
export function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf-8')
}
