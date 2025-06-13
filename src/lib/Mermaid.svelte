<script lang="ts">
  import mermaid from 'mermaid';

  // The default diagram
  let diagram = `sequenceDiagram
    actor U as User
    participant A as Frequency Access
    participant UI as Rewards & Boosting
    participant W as Ecosystem Wallet
    participant F as Frequency Node

    Note over U,F: Flow for Getting Rewards
    U ->> A: (FA Screen) User sees claim rewards on FA
    U ->> A: User clicks claim rewards
    A ->> UI: User redirected to MSA Withdraw flow (Data: MSAId)
    UI ->> F: Get MSA Token Balance
    UI ->> U: Show MSA Token Balance
    U ->> UI: Give me the tokens
    UI ->>+ W: Connect to Wallet
    W ->>- UI: List of Addresses
    UI ->> U: Select Wallet Address
    U ->> UI: I want to do the withdraw
    UI ->> U: Confirm with Frequency Access withdraw permission
    UI ->> A: Get withdraw permission (address)
    A ->> F: Get User's MSA token amount
    A ->> U: (FA Screen) Are you sure you want to withdraw <Amount> to <Address>?
    U ->> A: YES
    A ->> A: Use Control Key to sign over <Address>
    A ->> UI: Redirect with (Data: signature)
    UI ->> UI: Check if different MSA from expected
    UI ->> U: Submit withdraw now?
    U ->>+ UI: YES
    UI ->>+ W: Do transaction?
    W ->>- UI: Signed Transaction
    UI ->>+ F: Do withdraw
    F ->>- UI: Complete
    UI ->>- U: You got tokens!
    Note over U,F: User is redirected to the boosting dashboard
    UI ->> U: You are earning!
    U ->> UI: Manage?
    UI ->>+ F: Check wallet token status
    F ->>- UI: Token status (can stake more, claim payout, unstake, unlock?)
    UI ->> UI: Enable actions based on token status
    UI ->>+ U: Stake More?
    U ->>- UI: YES
    U ->> UI: CONFIRM 
    UI ->> UI: Loading Screen
    Note over U,F: User is redirected to the boosting dashboard
    UI ->> UI: Enable actions based on token status
    UI ->>+ U: Claim Payout?
    U ->>- UI: YES
    U ->> UI: CONFIRM 
    UI ->> UI: Loading Screen
    Note over U,F: User is redirected to the boosting dashboard
    UI ->> UI: Enable actions based on token status
    UI ->>+ U: Unstake?
    U ->>- UI: YES
    UI ->>+ U: Choose applicaiton and ammount to unstake
    U ->>- UI: CONFIRM
    UI ->> UI: Loading Screen
    Note over U,F: User is redirected to the boosting dashboard
    UI ->> UI: Enable actions based on token status
    UI ->>+ U: Unlock?
    U ->>- UI: YES
    U ->> UI: CONFIRM 
    UI ->> UI: Loading Screen
    Note over U,F: User is redirected to the boosting dashboard
`;

  let container: any;

  async function renderDiagram() {
    const { svg } = await mermaid.render('mermaid', diagram);
    container.innerHTML = svg;
  }

  $: diagram && renderDiagram();
</script>

<div>
  <pre contenteditable="true" bind:innerHTML={diagram}></pre>
  <span bind:this={container}> </span>
</div>
