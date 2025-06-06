<script lang="ts">
  import { Button, Modal } from '@frequency-chain/style-guide';
  import LoginForm from './LoginForm.svelte';
  import { isLoggedIn } from '$lib/stores/stores';

  const title = $derived($isLoggedIn ? 'Switch Wallet' : 'Connect Wallet');
  const description = 'Connect your Polkadot wallet to start boosting.';
</script>

{#snippet trigger()}
  <Button>{title}</Button>
{/snippet}
{#snippet body()}<LoginForm />{/snippet}

<Modal {title} {description} {trigger} {body} />
