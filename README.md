# @lukso/web-components &middot; [![npm version](https://img.shields.io/npm/v/@lukso/web-components.svg?style=flat)](https://www.npmjs.com/package/@lukso/web-components)

Web Components library address issue of sharing same visual elements and basic style setup across different projects. It's based on following tools

- [Tailwind CSS](https://tailwindcss.com/)
- [Lit](https://lit.dev/)
- [Storybook](https://storybook.js.org/)

Please check the storybook [preview page](https://tools-web-components.pages.dev/) for full component list and basic styling.

## Prerequisites

This project uses [mise](https://mise.jdx.dev/) for managing tool versions (Node.js, pnpm).

### Install mise

```bash
# macOS
brew install mise

# Or see https://mise.jdx.dev/getting-started.html for other installation methods
```

Then activate mise in your shell (add to `~/.zshrc` or `~/.bashrc`):

```bash
eval "$(mise activate zsh)"  # or bash
```

### Install project tools

```bash
mise install
```

This will install the correct versions of Node.js and pnpm as specified in `.mise.toml`.

## Installation

In order to use library you need to install this as npm package

```sh
pnpm add @lukso/web-components
```

## Using the library

Library is focused around projects build on top of [Tailwind CSS](https://tailwindcss.com/) framework. It ships with bunch of components, presets for styles, typography and colors.

#### Components

For using components you need to first import them either as individual ones:

```js
import('@lukso/web-components/components/dist/lukso-button')
import('@lukso/web-components/components/dist/lukso-card')
import('@lukso/web-components/components/dist/lukso-tag')
```

or all of them in single import:

```js
import('@lukso/web-components')
```

> Hint: you can make import in root level of your project (`app.vue`) instead of importing in every component.

> Hint: In Frameworks that use SSR you need to import components only when window object is defined.

Use components in the HTML with following rules:

- components are lowercase and with `-` in name i.e `lukso-button`
- they need to have closing tag even if they don't use slot
- properties are lowercase and with `-` in name i.e `primary-color="neutral-100"`
- boolean properties are working with just a presence `is-checked`

See example below:

```html
<lukso-example-component primary-color="neutral-100" is-checked></lukso-button>
```

> Under the hood you use Web Components which styles are encapsulated within own shadow DOM (host page doesn't have access to it styles and vice versa). The only thing that components share from are fonts, colors and variables, see more on [CSS inheritance](https://lit.dev/docs/components/styles/#inheritance).

### React TypeScript Support

When using these web components in React projects with TypeScript, you'll need to add type definitions to get proper IntelliSense and type checking for the custom elements.

#### Method 1: Using the provided template

Copy the `templates/react-types.d.ts` file to your React project (e.g., as `src/types/lukso-components.d.ts`):

```typescript
import '@lukso/web-components'

// Dynamic type generation based on HTMLElementTagNameMap
type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${CamelToKebab<U>}`
    : `${Lowercase<T>}-${CamelToKebab<U>}`
  : S

type ComponentProps<T> = {
  [K in keyof T as T[K] extends (...args: unknown[]) => unknown
    ? never
    : K]: T[K]
}

type KebabHTMLAttributes<T> = {
  [K in keyof ComponentProps<T> as CamelToKebab<
    K & string
  >]?: ComponentProps<T>[K]
}

type ReactWebComponentProps<T> = T extends HTMLElement
  ? React.DetailedHTMLProps<React.HTMLAttributes<T>, T> & KebabHTMLAttributes<T>
  : never

type CustomElementsOnly = {
  [K in keyof HTMLElementTagNameMap as K extends `${string}-${string}`
    ? K
    : never]: HTMLElementTagNameMap[K]
}

type CustomElements = {
  [K in keyof CustomElementsOnly]: ReactWebComponentProps<CustomElementsOnly[K]>
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
```

#### Method 2: Manual configuration

1. Ensure `@lukso/web-components` is imported to register the components
2. Add the type definitions file to your project
3. Make sure your `tsconfig.json` includes the type definition file

Once configured, you'll get full TypeScript support:

```tsx
// Full IntelliSense for component properties
<lukso-profile
  profile-url="/path/to/image.jpg"
  has-identicon={true}
  size="large"
/>
```

> Note: The type definitions automatically convert camelCase properties to kebab-case attributes as expected by React.

### Styles (Tailwind CSS projects)

##### 1. Add this preset in the config file

```js
// tailwind.config.js
module.exports = {
  presets: [require('@lukso/web-components/tailwind.config')],
  // ...
}
```

##### 2. Include styles in your main file

```scss
// main.scss
$font-file-path: '/assets/fonts';

@import '@lukso/web-components/tools/sass/main.scss';
```

##### 3. Add script to copy assets in your build config

In order to use other files like fonts or images from library we need to manually copy them to your project. This is ESM limitation that allow to import only `js` files.

```ts
import { copyAssets } from '@lukso/web-components/tools/copy-assets'
import assets from '@lukso/web-components/tools/assets'

copyAssets('./src', assets)
```

> Place this at the top of your build file ie. `vite.config.ts`

### Styles (non Tailwind CSS projects)

Atm the only thing that you can benefit from non Tailwind CSS projects is loading the fonts

```scss
// main.scss
$font-file-path: '/assets/fonts';

@import '@lukso/web-components/tools/sass/fonts.scss';
```

## Icons

We currently support custom icons and the one from `Vuesax` icon pack. They work almost the same but there is a difference is adding them to library:

#### Custom icons

They are added as Typescript files. Each icon needs to be wrapped in ts file and dynamic parts like `stroke`, `fill`, `stroke-width` needs to be replaced with placeholders. Icons needs to be registered in the icon index file.

#### Vuesax icons

Those icon take more modern approach. All it is needed that the svg files have to be placed in correct folder structure under `src/components/lukso-icon/vuesax`. Then component takes over all the parsing part to make them usable. Since we rely on Figma file the easiest is just to export the whole icon group and [copy into the project](https://share.cleanshot.com/CgthLhSs).

## Development workflow

Start the watch mode and Storybook preview

```sh
pnpm dev
```

check for the issues after code changes

```sh
pnpm lint
pnpm test
```

### Initial Setup

When cloning the repository for the first time, you'll need to run the build process to generate the package workspace:

```sh
# Install dependencies
pnpm install

# Build the project (generates package/package.json)
pnpm build

# Install dependencies again to register the workspace
pnpm install
```

> Note: The `package/package.json` file is generated dynamically during the build process and is not tracked in git. This prevents version conflicts in pull requests.

## Releasing project

This repo uses [Release Please](https://github.com/googleapis/release-please) to automate release process. It's important to follow [Conventional Commits](https://www.conventionalcommits.org/) spec for naming Pull Requests. Once PR is merged into `main` the release PR will be created. When release PR is merged new package is released in npm.

## Using Without a Bundler (Import Maps)

If you need to use `@lukso/web-components` in environments without a bundler (e.g., plain HTML, WordPress, static sites), you can use import maps to resolve bare module specifiers.

Since this package uses Lit as a peer dependency and marks it as external, it outputs bare imports like `import { html } from 'lit'`. Browsers can't resolve these without help.

### Example: Using Import Maps

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Import Map to resolve bare module specifiers -->
    <script type="importmap">
      {
        "imports": {
          "lit": "https://cdn.jsdelivr.net/npm/lit@3.3/+esm",
          "lit/": "https://cdn.jsdelivr.net/npm/lit@3.3/",
          "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2/+esm",
          "@lit/reactive-element/": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2/",
          "@preact/signals-core": "https://cdn.jsdelivr.net/npm/@preact/signals-core@1/+esm",
          "@lukso/core": "https://cdn.jsdelivr.net/npm/@lukso/core/+esm",
          "@lukso/web-components": "https://cdn.jsdelivr.net/npm/@lukso/web-components/+esm"
        }
      }
    </script>
  </head>
  <body>
    <!-- Use web components -->
    <lukso-button is-full-width>Click Me</lukso-button>
    <lukso-profile
      profile-url="/path/to/image.jpg"
      has-identicon
      size="large"
    ></lukso-profile>

    <!-- Load module -->
    <script type="module">
      import '@lukso/web-components'
      // Components are now registered and ready to use
    </script>
  </body>
</html>
```

### Notes on Import Maps

- **Browser Support**: Import maps are supported in all modern browsers (Chrome 89+, Safari 16.4+, Firefox 108+)
- **Must be before scripts**: The `<script type="importmap">` must appear before any `<script type="module">` that uses imports
- **One per page**: Only one import map is allowed per HTML document
- **Trailing slashes matter**: Use `"lit/"` to map subpath imports like `import { html } from 'lit/html.js'`
- **All dependencies required**: You must map all external dependencies that the packages import, including `@lukso/core`

### Limitations Without Bundler

- No tree-shaking (entire packages are loaded)
- No module concatenation (more HTTP requests)
- No code minification (unless using pre-minified CDN builds)
- Larger initial load size

For production applications, we recommend using a bundler (Vite, Webpack, Rollup) which provides better performance through tree-shaking and optimization.

## Linking the library

For local development it's handy to link component library with the project you currently develop. This way you can work with components like in normal app. To make it work you need to first link the library:

```sh
pnpm link ../tools-web-components
```

The only caveat with linking is that this will add resolution entry into `package.json` and `pnpm-lock.yaml` which shouldn't be committed. Make sure to revert these changes or run unlink command

```sh
pnpm unlink ../tools-web-components
```
