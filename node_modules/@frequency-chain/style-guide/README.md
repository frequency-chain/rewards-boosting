# Frequency Style Guide

**Svelte + Storybook + TailwindCSS**

## Prerequisites

This package is designed to work specifically with **Svelte v5 + Tailwind v4** projects.

## Installation

When installing this package into your project, follow the steps below.

1. Install the style guide package:

```zsh
npm i @frequency-chain/style-guide
```

2. [Install and configure Tailwind](https://tailwindcss.com/docs/guides/sveltekit).

- **Skip the step where you add `@import "tailwindcss";`** to your css file as it has already been imported in the
  library.

3. Edit your `app.css` file to import the style guide and set the source.

```css
@import '@frequency-chain/style-guide/styles';

@source '../../node_modules/@frequency-chain/style-guide/**/*.{svelte,js,ts}';
```

You should now be able to access the Frequency Style Guide Tailwind theme and custom css classes in your Svelte
components! (Make sure you update the path to the `node_modules` if it is different than above.)

---

## Development

### Storybook Quickstart

To spin up the style guide and see what icons, features, atoms, typography, and colors are included, run the commands
below.

```zsh
npm i
npm run storybook
```

### Package Testing

1. Build the /dist.

```zsh
npm run build
```

2. Create pack.

```zsh
cd dist
npm pack
```

3. Install local package into a new project.
   - Navigate to a new Svelte project.
   - Follow the [installation steps](#installation).
   - When installing the package, remember to **use the local version you just created**!

### Dev Notes

- Anything that should be exported for the package should be in `src/lib`.
- Any components that you wish to export must be exported in `index.ts`.
