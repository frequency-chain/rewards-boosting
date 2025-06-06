<script lang="ts">
  import { Button } from '@frequency-chain/style-guide';

  import { allAccountsStore, type Account } from '$lib/stores/accountsStore';
  import { user } from '$lib/stores/userStore';
  import SelectNetworkAndAccount from '../SelectNetworkAndAccount.svelte';

  // Props
  interface Props {
    onConnect?: () => void;
  }

  let { onConnect = () => {} }: Props = $props();

  // Get the matching account object safely
  let newUser: Account | null = $state($allAccountsStore.get($user.address) ?? null);
  let success = $state(false);

  // Derive whether we can connect
  const canConnect = $derived.by(() => {
    console.log('Selected new user: ', newUser);
    return newUser?.network != null && $allAccountsStore.size > 0 && newUser?.address !== '';
  });

  // Handle connect
  async function connect() {
    if (!newUser) {
      alert('Invalid form values');
      return;
    }
    $user = newUser;
    onConnect();
    success = true;
  }
</script>

{#if success}
  <div class="gap-f16 flex flex-col text-center wrap-anywhere">
    <div class="text-success font-bold">Successfully Connected!</div>
    <div class="text-success font-bold">{`${$user.display}: ${$user.address}`}</div>
  </div>
{:else}
  <form class="gap-f16 flex flex-col">
    <SelectNetworkAndAccount
      bind:newUser
      accounts={$allAccountsStore}
      accountSelectorTitle="Select a Control Key"
      accountSelectorPlaceholder="Select a Control Key"
    />

    <Button disabled={!canConnect} onclick={connect}>Connect to Account</Button>
  </form>
{/if}
