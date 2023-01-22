import { defineConfig } from 'vite'
import path from 'path'
import { readdir, readFile, stat, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function readDeps(dir, prefix = []) {
  let output: {
    entry: string
    source: string
    name: string
    require: string
    import: string
  }[] = []
  const list = await readdir(dir)
  for (const file of list) {
    if (file === '.' || file === '..') {
      continue
    }
    const info = await stat(path.join(dir, file))
    if (info.isDirectory()) {
      if (file !== 'shared') {
        const subOutput = await readDeps(path.join(dir, file), [
          ...prefix,
          file,
        ])
        output = output.concat(subOutput)
        output.sort(({ name: a }, { name: b }) => {
          if (a > b) {
            return 1
          } else if (a < b) {
            return -1
          }
          return 0
        })
      }
    } else if (/components\//.test(dir) && /\.ts$/.test(file)) {
      if (file !== 'index.ts') {
        continue
      }
      const entry = `./${path.join(dir, file)}`
      output.push({
        entry,
        source: `./${path
          .relative(path.join(__dirname, 'src'), entry)
          .replace(/.ts$/, '')}`,
        name: path.basename(path.dirname(entry)),
        require: `./${path
          .join('dist', path.relative(path.join(__dirname, 'src'), entry))
          .replace(/.ts$/, '.cjs')}`,
        import: `./${path
          .join('dist', path.relative(path.join(__dirname, 'src'), entry))
          .replace(/.ts$/, '.cjs')}`,
      })
      output.sort(({ name: a }, { name: b }) => {
        if (a > b) {
          return 1
        } else if (a < b) {
          return -1
        }
        return 0
      })
    }
  }
  return output
}

async function writeIndex() {
  const list = await readDeps('src')
  await writeFile(
    path.join(__dirname, 'src/index.ts'),
    `// DO NOT MODIFY MANUALLY\n${list
      .map(({ source }) => `export * from '${source}'`)
      .join('\n')}\n`
  )
}

async function writePackage() {
  const list = await readDeps('src')
  const exp = {
    '.': {
      require: './dist/index.cjs',
      import: './dist/index.js',
      types: './dist/index.d.ts',
    },
    './tailwind.config': './tailwind.config.cjs',
    './assets/fonts/': './dist/assets/fonts/',
    './assets/fonts': {
      require: './dist/assets/fonts/index.cjs',
      import: './dist/assets/fonts/index.js',
      types: './dist/assets/fonts/index.d.ts',
    },
    './styles/': './dist/styles/',
    './styles': {
      require: './dist/styles/index.cjs',
      import: './dist/styles/index.js',
      types: './dist/styles/index.d.ts',
    },
    './sass/': './dist/sass/',
    './sass': {
      require: './dist/sass/index.cjs',
      import: './dist/sass/index.js',
      types: './dist/sass/index.d.ts',
    },
    './tools/color-palette': './tools/color-palette.cjs',
  }
  for (const { name } of list) {
    exp[`./${name}`] = {
      require: [`./dist/${name}.cjs`],
      import: [`./dist/${name}.js`],
      types: [`./dist/${name}.d.ts`],
    }
  }
  const pack = JSON.parse(await readFile('./package.json', 'utf-8'))
  pack.exports = exp
  await writeFile('./package.json', `${JSON.stringify(pack, null, '  ')}\n`)
  return exp
}

export async function createLib() {
  await writeIndex()
  await writePackage()
  const list = await readDeps('src')
  const ents = {
    index: './src/index.ts',
    'styles/index': './src/shared/styles/index.ts',
    'assets/fonts/index': './src/shared/assets/fonts/index.ts',
    'sass/index': './src/shared/styles/index.ts',
  }
  for (const { name, entry } of list) {
    ents[name] = entry
  }
  const lib = {
    entry: ents,
    name: 'Lukso Components',
  }
  return lib
}

export const Default = defineConfig(async ({}) => {
  const lib = await createLib()
  return {
    build: {
      lib,
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: './src/shared/assets/fonts/*',
            dest: 'assets/fonts',
          },
          {
            src: './src/shared/styles/*',
            dest: 'sass',
          },
        ],
      }),
    ],
  }
})
export default Default
