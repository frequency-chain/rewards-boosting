<script lang="ts">
  import { getCapacityInfo, type CapacityDetails } from '$lib/polkadotApi';
  import { dotApi } from '$lib/stores/stores';
  import { user } from '$lib/stores/userStore';

  // GET TOKEN STATUS (can stake more, claim payout, unstake, unlock?)
  let capacityDetails: CapacityDetails | null = $state(null);
  if ($user?.msaId && $user.msaId !== 0 && $dotApi.api) {
    getCapacityInfo($dotApi.api, $user.msaId).then((info) => (capacityDetails = info));
  }
  // Returns a list of UnclaimedRewardInfo for the provided AccountId.
  // CapacityRuntimeApi_list_unclaimed_rewards()

  // Returns information about an account’s current staking details
  // stakingAccountLedger()

  // Returns the information about an account’s current unstaking details and the unlocking chunks
  // unstakeUnlocks()

  // Returns the ProviderBoostHistory stored for the provided AccountId
  // providerBoostHistories()

  // Returns the index of the current era and the block when it started
  // currentEraInfo()

  // Returns the total amount of token staked this Reward Era, as of the current block
  // currentProviderBoostTotal()

  // EXECUTE STAKE
  // Lock tokens to grant Capacity to a Provider
  // await submitStake(
  //   $dotApi.api as ApiPromise,
  //   await getExtension($user),
  //   selectedAccount,
  //   $user.msaId,
  //   stakeAmountInPlancks
  // );

  // EXECUTE UNSTAKE
  // Begin the process of unlocking tokens by unstaking currently staked tokens
  // await submitUnstake();

  // EXECUTE PAYOUT
  // Complete the process of unlocking tokens staked by releasing locks on expired unlock chunks
  // withdraw_unstaked()

  // EXECUTE UNLOCK
</script>

<div class="gap-f16 freq-container flex flex-col items-start">
  <h1 class="text-primary">Rewards Boosting Dashboad</h1>
</div>
