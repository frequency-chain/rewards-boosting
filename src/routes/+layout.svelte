<script lang="ts">
  import '../app.css';
  import { Header, Footer } from '@frequency-chain/style-guide';
  import { base } from '$app/paths';

  let { children } = $props();
</script>

<div>
  <div class="sticky top-0 z-50 mb-4 w-full bg-white">
    <Header highlightMarginTop="-90px" innerClass="freq-container-padding" logoLink={base + '/'} />
  </div>
  <div class="xs:min-h-[calc(100vh-410px)] w-full md:min-h-[calc(100vh-442px)]">
    {@render children()}
  </div>
  <div class="freq-container-padding bg-navy pt-f48 w-full">
    <Footer intent="light" class="vertical-lg:w-[100%] w-full" />
  </div>
</div>
