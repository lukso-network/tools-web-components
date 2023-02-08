# @lukso/web-components &middot; [![npm version](https://img.shields.io/npm/v/@lukso/web-components.svg?style=flat)](https://www.npmjs.com/package/@lukso/web-components)

Web Components library address issue of sharing same visual elements and basic style setup across different projects. It's based on following tools

- [Tailwind CSS](https://tailwindcss.com/)
- [Lit](https://lit.dev/)
- [Storybook](https://storybook.js.org/)

Please check the storybook [preview page](https://tools-web-components.pages.dev/) for full component list and basic styling.

## Installation

In order to use library you need to install this as npm package

```sh
yarn add @lukso/web-components
```

## Using the library

Library is focused around projects build on top of [Tailwind CSS](https://tailwindcss.com/) framework. It ships with bunch of components, presets for styles, typography and colors.

#### Components

For using components you need to first import them either as individual ones:

```js
import('@lukso/web-components/components/lukso-button')
import('@lukso/web-components/components/lukso-card')
import('@lukso/web-components/components/lukso-tag')
```

or all of them in single import:

```js
import('@lukso/web-components/components')
```

> Hint: you can make import in root level of your project (`app.vue`) instead of importing in every component.

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

### Styles (Tailwind CSS projects)

Please add this preset in the config file

```js
// tailwind.config.js
module.exports = {
  presets: [require('@lukso/web-components/tailwind.config')],
  // ...
}
```

and include styles in your main file

```scss
// main.scss
$font-file-path: '/assets/fonts';

@import '@lukso/web-components/sass/main.scss';
```

### Styles (non Tailwind CSS projects)

Atm the only thing that you can benefit from non Tailwind CSS projects is loading the fonts

```scss
// main.scss
$font-file-path: '/assets/fonts';

@import '@lukso/web-components/sass/fonts.scss';
```

## Development workflow

Start the watch mode and Storybook preview

```sh
yarn dev
```

check for the issues after code changes

```sh
yarn lint
yarn test
```

## Releasing project

This repo uses [Release Please](https://github.com/googleapis/release-please) to automate release process. It's important to follow [Conventional Commits](https://www.conventionalcommits.org/) spec for naming Pull Requests. Once PR is merged into `main` the release PR will be created. When release PR is merged new package is released in npm.

## Linking the library

For local development it's handy to link component library with the project you currently develop. This way you can work with components like in normal app. To make it work you need to first link the library:

```sh
yarn link -p ../tools-web-components
```

The only caveat with linking is that this will add resolution entry into `package.json` and package.lock` which shouldn't be committed. Make sure to revert this changes or run unlink command

```sh
yarn unlink ../tools-web-components
```

## How to build the components

// TBA
