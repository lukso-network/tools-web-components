import { build } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import createExternal from 'vite-plugin-external'
import * as url from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const chokidar = {
  ignored: ['node_modules/**', 'tools/**', 'dist/**'],
}

const resolve = {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}

export async function run(argv: any) {
  const { mode } = argv
  const libs = [
    {
      fileName: 'index',
      name: 'tools',
      entry: './src/shared/tools/index.ts',
    },
    {
      fileName: 'color-palette',
      name: 'tools_color_palette',
      entry: './src/shared/tools/color-palette.ts',
    },
    {
      fileName: 'copy-assets',
      name: 'tools_copy_assets',
      entry: './src/shared/tools/copy-assets.ts',
    },
  ]

  try {
    const entries = {}
    for (const { fileName, entry } of libs) {
      entries[fileName] = entry
    }
    await build({
      configFile: false,
      resolve,
      build: {
        minify: false,
        lib: {
          entry: entries,
          formats: ['es', 'cjs'],
        },
        target: 'esnext',
        outDir: './package/tools',
        emptyOutDir: true,
        watch:
          mode !== 'production'
            ? {
                clearScreen: false,
                chokidar,
                exclude: ['node_modules/**', 'tools/**', 'dist/**'],
              }
            : null,
      },
      plugins: [
        createExternal({
          externals: {
            fs: 'fs',
            path: 'path',
          },
        }),
        dts({
          // insertTypesEntry: true,
          entryRoot: 'src/shared/tools',
          outputDir: './package/tools',
          include: ['./src/shared/tools'],
        }),
      ].filter(item => item),
    })
  } catch (err) {
    console.error(err)
  }
}

if (import.meta.url.startsWith('file:')) {
  // (A)
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    // (B)
    const { argv } = yargs(hideBin(process.argv))
    run(argv)
      .then(() => {
        if (argv['mode'] === 'production') {
          console.log('build finished')
          process.exit(0)
        }
      })
      .catch(err => {
        console.error(err)
        process.exit(1)
      })
  }
}
