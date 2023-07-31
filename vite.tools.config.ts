import { build } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import createExternal from 'vite-plugin-external'
import { viteStaticCopy } from 'vite-plugin-static-copy'
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
    {
      fileName: 'assets/index',
      name: 'tools_assets',
      entry: './src/shared/assets/index.ts',
    },
    {
      fileName: 'assets/fonts/index',
      name: 'tools_assets_fonts',
      entry: './src/shared/assets/fonts/index.ts',
    },
    {
      fileName: 'assets/images/index',
      name: 'tools_assets_images',
      entry: './src/shared/assets/images/index.ts',
    },
    {
      fileName: 'styles/index',
      name: 'tools_styles',
      entry: './src/shared/styles/index.ts',
    },
    {
      fileName: 'sass/index',
      name: 'tools_styles',
      entry: './src/shared/styles/index.ts',
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
        viteStaticCopy({
          targets: [
            {
              src: './src/shared/assets/fonts/*.woff2',
              dest: 'assets/fonts',
            },
            {
              src: './src/shared/assets/images/*.{png,svg,jpg,jpeg}',
              dest: 'assets/images',
            },
            {
              src: './src/shared/styles/**/*.scss',
              dest: 'sass',
            },
          ],
        }),
        createExternal({
          externals: {
            fs: 'fs',
            path: 'path',
          },
        }),
        dts({
          entryRoot: 'src/shared/tools',
          outDir: './package/tools',
          include: ['./src/shared/tools'],
        }),
        dts({
          include: ['./src/shared/assets'],
          outDir: './package/tools/assets',
        }),
        dts({
          include: ['./src/shared/styles'],
          outDir: './package/tools/styles',
        }),
        dts({
          include: ['./src/shared/styles'],
          outDir: './package/tools/sass',
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
