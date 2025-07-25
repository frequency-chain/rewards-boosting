import type { DotApi, MsaInfo } from '$lib/stores/storeTypes';
import { options } from '@frequency-chain/api-augment';
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ChainProperties } from '@polkadot/types/interfaces';

export type AccountMap = Record<string, KeyringPair>;

export async function createApi(networkEndpoint: string): Promise<DotApi> {
  const wsProvider = new WsProvider(networkEndpoint);

  const apiPromise = await ApiPromise.create({
    provider: wsProvider,
    throwOnConnect: true,
    throwOnUnknown: true,
    ...options,
  });

  await apiPromise.isReady;

  const initializedDotApi: DotApi = {
    wsProvider: wsProvider,
    api: apiPromise,
    keyring: new Keyring(),
    selectedEndpoint: networkEndpoint,
    options,
  };
  return initializedDotApi;
}

export function getToken(chain: ChainProperties) {
  const rawUnit = chain.tokenSymbol.toString();
  return rawUnit.slice(1, rawUnit.length - 1);
}

export interface AccountBalances {
  transferable: bigint;
  locked: bigint;
  total: bigint;
}
export async function getBalances(apiPromise: ApiPromise, ControlKey: string): Promise<AccountBalances> {
  const accountData = ((await apiPromise.query.system.account(ControlKey)) as any).data;
  const free = accountData.free.toBigInt();
  const locked = accountData.frozen.toBigInt();
  const transferableNum = free - locked;
  const transferable = BigInt(transferableNum);
  const total = free + accountData.reserved.toBigInt();
  return {
    transferable,
    locked,
    total,
  };
}

export async function getMsaInfo(apiPromise: ApiPromise, publicKey: string): Promise<MsaInfo> {
  const received = ((await apiPromise?.query.msa.publicKeyToMsaId(publicKey)) as any)?.unwrapOrDefault();
  const msaInfo: MsaInfo = { isProvider: false, msaId: 0, providerName: '' };
  msaInfo.msaId = received?.toNumber();
  if (msaInfo.msaId > 0) {
    const providerRegistry = await apiPromise.query.msa.providerToRegistryEntry(msaInfo.msaId);
    if ((providerRegistry as any).isSome) {
      msaInfo.isProvider = true;
      const registryEntry = (providerRegistry as any).unwrap();
      msaInfo.providerName = registryEntry.providerName.toString();
    }
  }
  return msaInfo;
}

export interface CapacityDetails {
  remainingCapacity: bigint;
  totalTokensStaked: bigint;
  totalCapacityIssued: bigint;
  lastReplenishedEpoch: bigint;
}

export const defaultCapacityDetails: CapacityDetails = {
  remainingCapacity: 0n,
  totalCapacityIssued: 0n,
  totalTokensStaked: 0n,
  lastReplenishedEpoch: 0n,
};

export async function getCapacityInfo(apiPromise: ApiPromise, msaId: number): Promise<CapacityDetails> {
  const providerRegistry = await apiPromise.query.msa.providerToRegistryEntry(msaId);

  let capacityDetails = defaultCapacityDetails;

  if ((providerRegistry as any).isSome) {
    const details = ((await apiPromise.query.capacity.capacityLedger(msaId)) as any).unwrapOrDefault();
    capacityDetails = {
      remainingCapacity: details.remainingCapacity.toBigInt(),
      totalTokensStaked: details.totalTokensStaked.toBigInt(),
      totalCapacityIssued: details.totalCapacityIssued.toBigInt(),
      lastReplenishedEpoch: details.lastReplenishedEpoch.toBigInt(),
    };
  }

  return capacityDetails;
}

export async function getControlKeys(apiPromise: ApiPromise, msaId: number): Promise<string[]> {
  const keyInfoResponse = (await (apiPromise.rpc as any).msa.getKeysByMsaId(msaId)).toHuman() as any;
  const keys = keyInfoResponse?.msa_keys;
  if (keys) {
    console.log('Successfully found keys.', keys);
    return keys;
  }
  throw Error(`Keys not found for ${msaId}`);
}
