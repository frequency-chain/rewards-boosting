<script lang="ts">
  import ButtonNoFill from '$components/ButtonNoFill.svelte';
  import LoginModal from '$components/Login/LoginModal.svelte';
  import { isLoggedIn, logout } from '$lib/stores/stores';
  import { user } from '$lib/stores/userStore';
</script>

<div class="gap-f16 freq-container flex flex-col items-start">
  <h1 class="text-primary">Rewards Boosting</h1>

  <LoginModal />
  {#if $isLoggedIn}
    <div>
      <div class="font-bold">Succefully connected wallet!</div>
      <div>{`${$user.display}: ${$user.address}`}</div>
    </div>
    <ButtonNoFill id="logout-button" onclick={logout}>Logout</ButtonNoFill>
  {/if}
</div>
