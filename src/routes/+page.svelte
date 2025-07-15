<script lang="ts">
  import ButtonNoFill from '$components/ButtonNoFill.svelte';
  import LoginModal from '$components/Login/LoginModal.svelte';
  import { isLoggedIn, logout } from '$lib/stores/stores';
  import { user } from '$lib/stores/userStore';
</script>

<div class="gap-f16 freq-container flex flex-col items-start">
  <h1 class="text-primary">Rewards Boosting Dashboad</h1>

  <!-- GET TOKEN STATUS (can stake more, claim payout, unstake, unlock?) -->
  <!-- GET TOKEN STATUS RESPONSE -->

  <!-- EXECUTE STAKE REQUEST PROPS -->
  <!-- EXECUTE STAKE RESPONSE -->

  <!-- EXECUTE PAYOUT REQUEST PROPS -->
  <!-- EXECUTE PAYOUT RESPONSE -->

  <!-- EXECUTE UNSTAKE REQUEST PROPS -->
  <!-- EXECUTE UNSTAKE RESPONSE -->

  <!-- EXECUTE UNLOCK REQUEST PROPS -->
  <!-- EXECUTE UNLOCK RESPONSE -->
</div>
