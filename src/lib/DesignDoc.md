- TODO: ADD CALLS THAT ARE AVAILABLE TO GET THE INFO THAT WE NEED.
- TODO: DECIDE IF WE WANT TO ADD ANY RPCS TO SIMPLIFY CALLS.

# Design Document: Rewards Boosting

## Context and Scope

This document describes Rewards Boosting, an app that helps users to connect to thair Polkadot wallet and claim tokens, stake tokens to providers, and unstake their rewards from providers.

## Problem Statement

Currently, there is no user facing app that helps users to easily carry out rewards boosting. Given that staking to providers is a priority in our token incentive model, we want to support staking and other related actions for users.

## Goals

To make claiming tokens, staking to providers, and destaking accessabile to the average token holder.

## Proposal

I propose a rewards boosting app that users are directed to from Frequency Access for users to claim Community Rewards and manage staking.

### Flow 1: Claim Community Rewards

1. **User Interaction**

   - User views claim rewards option on Frequency Access.
   - User clicks to claim Community Rewards.

2. **Redirect to Claim Tokens Flow**

   - Frequency Access redirects the user to Rewards Boosting UI with their MSA.
   - The MSA is then stored in a stateful store.

3. **Fetch Token Balance & Stake Status Data**

  - WHAT IS YOUR TOTAL BALANCE? CAN WE INCLUDE INFO ON WHAT IS INCLUDED IN THIS NUMBER?
    - UNCLAIMED COMMUNITY REWARDS (?)
    - UNCLAIMED PROVIDER BOOST REWARDS
    - PROVIDER BOOST STAKED BALANCE
    - TRANSFERABLE BALANCE (HAS BEEN CLAIMED, BUT NOT ALLOCATED)
    - LOCKED TOKENS FROM VOTING (?)

   - Rewards Boosting UI queries the Frequency Node for the current MSA's token balance and stake status.

   ```ts
    {
      tokensAvailableToClaim: number,
      totalBalance: number,
      stake: [{
        wallet: Wallet,
        provider: Provider,
        ammount: number,
        thawDate: Date,
        unlockDate: Date,
        rewardEra: Date,
        estimatedEarn: number,
      }],
    }
   ```

   - Rewards Boosting UI displays token balance and stake status to the user.

4. **Wallet Connection**

   - User connects to their Polkadot wallet.
   - Wallet returns list of available addresses.
   - User selects an address, which is then saved in a stateful store.

5. **Withdrawal Confirmation**

   - Rewards Boosting UI asks user to confirm withdrawal.
   - Rewards Boosting UI requests Frequency Access to generate a withdraw permission signature (signed using Control
     Key).
   - Frequency Access signs and returns the signature to UI.

6. **Final Withdrawal Execution**

   - Rewards Boosting UI verifies MSA is the expected MSA.
   - Rewards Boosting UI prompts user for final confirmation.
   - User confirms.
   - Rewards Boosting UI requests the Polkadot wallet to sign the transaction.
   - Rewards Boosting UI submits signed transaction to Frequency Node.
   - Frequency Node processes withdrawal.

7. **Post-Withdrawal**

   - User is redirected to the Boosting Dashboard.
   - Rewards Boosting UI notifies user of successful withdrawal.
   - Rewards Boosting UI queries the Frequency Node for the current MSA's token balance and stake status.


### Flow 2: Provider Boosting (Stake to Provider)

70% BOOSTED SECTION: WHEN 100% BOOSTED, COULD BE CONFUSING THAT THE BALANCE DOESNT MATCH TOTAL BALANCE. SOLUTION: SAY "MAX BOOSTED".

LOCK DATE SECTION: YOU DON'T GET AN UNLOCK DATE UNTIL YOU TRY TO UNSTAKE. IF YOU UNSTAKE MULTIPLE TIMES, YOU WILL HAVE MULTIPLE UNLOCK DATES. THE CURRENT UI DOESN'T SUPPORT THAT.

#### Entry Point

- After claiming Community Rewards or direct access to the Boosting Dashboard.

#### - Stake
  - User selects "Stake".
  - Chooses Provider and amount. ("CHOOSE A PROVIDER TO BOOST", "WHAT PROVIDER DO YOU WANT TO BOOST?").
    - User can enter desired ammount or click "max" button. The max available to stake is the `total transferable balance - existential deposit`. This number will always be lower than the total balance. CAN WE MAKE AN RPC THAT GETS THIS NUMBER?
  - Confirms stake details
  - Sign transaction
  - UI executes stake transaction via Frequency Node.

### Flow 3: Manage Staking

#### Entry Point

- After claiming Community Rewards or direct access to the Boosting Dashboard.

#### User Actions

- IF YOU'RE LOGGED IN UNDER AN ACCOUNT AND MORE TOKENS BECOME AVAILABLE TO CLAIM, WHERE DO I SEE THEM? CAN YOU ONLY ACCESS THROUGH THE ENTER WALLET ADDRESS PAGE?

#### - Stake More

UPDATE THIS SECTION WHEN THE STAKE FLOW IS FINALIZED.
IF YOU STAKE MORE, THE LOCK DATE CHANGES UNDER THE PROGRESS

- User selects "Stake More".
- Chooses Provider and amount.
- Confirms stake details.
- Sign transaction
- UI executes stake transaction via Frequency Node.

#### - Claim Payout
SHOULD WE TELL THE USER WHEN THEIR REWARDS ERA EXPIRES?
SHOULD WE BREAK DOWN THE PAYOUT DETAILS ANY MORE - BREAK DOWN BY REWARDS ERA & TOTAL? BECUASE THEY EXPIRE, WE SHOULD BE ABLE TO CLAIM BY ERA OR AT LEAST DISPLAY THE EXPERATIONS OF EACH ERA.

SHOULDN'T THE CLAIM PAYOUT BUTTON BE IN THE PAYOUTS SECTION?
- User selects "Claim Payout".
- Confirms action.
- Sign transaction
- UI executes payout transaction via Frequency Node.

#### - Unstake
YOU CANNOT UNSTAKE, THEN IMMEDIATELY RESTAKE TO SOMEONE ELSE. WE HAVE A THAW PERIOD OF 30 DAYS BEFORE THAT BALANCE CAN BE UNLOCKED AND ADDED TO A USERS TRANSFERABLE BALANCE. WHERE DO WE SEE TOKEN A BALANCE FOR THOSE THAT ARE BEING THAWED? WHERE DO WE TELL PEOPLE ABOUT THE THAW PERIOD?

IS A USE CASE FOR UNSTAKING FROM ALL PROVIDERS? - V2?

CAN WE ADD PROVIDER NAME NEXT TO TOTAL CURRENTLY STAKED

DO WE WANT TO INCLUDE ANY INFORMATION ON THE LOCK PERIOD AFTER UNSTAKING?

- User selects "Unstake".
- Chooses Provider and amount.
- Confirms unstake details.
- Sign transaction
- UI executes unstake transaction via Frequency Node.

#### - Unlock
IN THE UI, WHAT IS THE DIFFERENCE BETWEEN THAWING IN AND UNLOCKING IN?

- User selects "Unlock".
- Confirms unlock.
- Sign transaction - withdrawl unstaked
- UI executes unlock transaction via Frequency Node.

### After Each Action

- User is redirected to Boosting Dashboard.
- Rewards Boosting UI queries the Frequency Node for the current MSA's token balance and stake status.

## Sequence Diagram Reference
