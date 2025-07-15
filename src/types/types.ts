interface TokenStatusResponse {}

interface StakeResponse {}
// stake: AugmentedSubmittable<(target: u64 | AnyNumber | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64, u128]>;

interface PayoutResponse {}
// payout: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;

interface UnstakeResponse {}
// unstake: AugmentedSubmittable<(target: u64 | AnyNumber | Uint8Array, requestedAmount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64, u128]>;

interface UnlockResponse {}
// unlock: AugmentedSubmittable<(target: MultiAddress | {
//   Id: any;
// } | {
//     Index: any;
// } | {
//     Raw: any;
// } | {
//     Address32: any;
// } | {
//     Address20: any;
// } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
