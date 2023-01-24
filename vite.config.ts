import { build, defineConfig } from 'vite'
import path from 'path'
import { readdir, readFile, stat, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function readDeps(dir, prefix = []) {
  let output: {
    entry: string
    source: string
    name: string
    requires: string
    imports: string
    fileName: string
    types: string
  }[] =
    prefix.length === 0
      ? [
          {
            entry: './src/components/index.ts',
            source: './components/index',
            name: 'components',
            requires: './dist/components/index.umd.cjs',
            imports: './dist/components/index.js',
            types: './dist/components/index.d.ts',
            fileName: 'components/index',
          },
        ]
      : []
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
      const item = {
        entry,
        source: `./${path
          .relative(path.join(__dirname, 'src'), entry)
          .replace(/.ts$/, '')}`,
        name: path.basename(path.dirname(entry)),
        requires: `./${path
          .join('dist', path.relative(path.join(__dirname, 'src'), entry))
          .replace(/.ts$/, '.umd.cjs')}`,
        imports: `./${path
          .join('dist', path.relative(path.join(__dirname, 'src'), entry))
          .replace(/.ts$/, '.js')}`,
        types: `./${path
          .join('dist', path.relative(path.join(__dirname, 'src'), entry))
          .replace(/.ts$/, '.d.ts')}`,
        fileName: `${path.relative(
          path.join(__dirname, 'src'),
          entry.replace(/\.ts$/, '')
        )}`,
      }
      output.push(item)
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
  console.log(output)
  return output
}

async function writeIndex() {
  const list = await readDeps('src')
  await writeFile(
    path.join(__dirname, 'src/components/index.ts'),
    `// DO NOT MODIFY MANUALLY\n${list
      .slice(1)
      .map(({ source }) => {
        const file = `./${path.relative('./components', source)}`
        return `export * from '${file}'`
      })
      .join('\n')}\n`
  )
}

async function writePackage() {
  const list = await readDeps('src')
  const exp = {
    '.': {
      require: './dist/index.umd.cjs',
      import: './dist/index.js',
      types: './dist/index.d.ts',
    },
    './tailwind.config': './tailwind.config.cjs',
    './postcss.config': './postcss.config.cjs',
    './assets/fonts/': './dist/assets/fonts/',
    './assets/fonts': {
      require: './dist/assets/fonts/index.umd.cjs',
      import: './dist/assets/fonts/index.js',
      types: './dist/assets/fonts/index.d.ts',
    },
    './styles/': './dist/styles/',
    './styles': {
      require: './dist/styles/index.umd.cjs',
      import: './dist/styles/index.js',
      types: './dist/styles/index.d.ts',
    },
    './sass/': './dist/sass/',
    './sass': {
      require: './dist/sass/index.umd.cjs',
      import: './dist/sass/index.js',
      types: './dist/sass/index.d.ts',
    },
    './tools/color-palette': './tools/color-palette.cjs',
  }
  for (const { fileName, requires, imports, types } of list) {
    exp[`./${fileName.replace(/\/index$/, '')}`] = {
      require: requires,
      import: imports,
      types,
    }
  }
  const pack = JSON.parse(await readFile('./package.json', 'utf-8'))
  pack.exports = exp
  await writeFile('./package.json', `${JSON.stringify(pack, null, '  ')}\n`)
  return exp
}

export default async ({ mode }) => {
  await writeIndex()
  await writePackage()
  const list = await readDeps('src')
  const libs = [
    {
      fileName: 'index',
      name: 'Lukso Components',
      entry: './src/index.ts',
    },
    {
      fileName: 'styles/index',
      name: 'Lukso Components: Styles',
      entry: './src/shared/styles/index.ts',
    },
    {
      fileName: 'assets/fonts/index',
      name: 'Lukso Components: Fonts',
      entry: './src/shared/assets/fonts/index.ts',
    },
    {
      fileName: 'sass/index',
      name: 'Lukso Components: Sass',
      entry: './src/shared/styles/index.ts',
    },
  ].concat(
    list.map(({ entry, fileName, name }) => {
      return {
        fileName,
        name: `LuksoComponents: ${name}`,
        entry,
      }
    })
  )

  if (mode === 'production') {
    for (const lib of libs.slice(1)) {
      await build({
        configFile: false,
        build: {
          lib,
          emptyOutDir: lib.fileName === 'index',
        },
        plugins: [
          lib.fileName === 'index'
            ? viteStaticCopy({
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
              })
            : null,
          dts({
            insertTypesEntry: true,
            entryRoot: 'src',
            // include: ['./src/index.ts', './src/components/*/index.ts', '*.scss'],
            outputDir: './dist',
          }),
        ].filter(item => item),
      })
    }
  }
  return defineConfig({
    build: {
      lib: libs[0],
      emptyOutDir: false,
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
      dts({
        insertTypesEntry: true,
        entryRoot: 'src',
        // include: ['./src/index.ts', './src/components/*/index.ts', '*.scss'],
        outputDir: './dist',
      }),
    ],
  })
}
