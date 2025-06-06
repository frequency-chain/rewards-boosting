import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // dependent on host platform, see GitHub pages doc, maybe?
      precompress: false,
      strict: true,
    }),
    alias: {
      $components: './src/components',
      '$components/*': './src/components/*',
      $pages: './src/components/pages',
      '$pages/*': './src/components/pages/*',
      $lib: './src/lib',
      '$lib/*': './src/lib/*',
      $routes: './src/routes',
      '$routes/*': './src/routes/*',
    },
  },
};

export default config;
