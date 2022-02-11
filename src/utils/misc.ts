import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';
import { findKey } from 'lodash';
import { registryAddresses, subgraphEndpoints } from '../constants';
import { protocolErrors, semanticErrors } from '../constants/protocolErrors';
import { ENetworks, TConfigByChainOrUndefined } from '../types';

export const pickError = (
  semanticError: typeof semanticErrors[keyof typeof semanticErrors],
): typeof protocolErrors[keyof typeof semanticErrors] => {
  console.log('semanticError::: ', semanticError);

  const protocolError = findKey(protocolErrors, error => error === semanticError);
  console.log('protocolError::: ', protocolError);
  if (protocolError) {
    return protocolError;
  }
  throw new Error('Unknown error');
};

export const configByChain = (chainIds: { [key: string]: number }, chainId: number): TConfigByChainOrUndefined => {
  const network = findKey(chainIds, id => id === chainId);
  if (network) {
    return {
      registryAddress: registryAddresses[network as ENetworks],
      subgraphEndpoint: subgraphEndpoints[network as ENetworks],
    };
  }
  return undefined;
};

// TODO (mine): polish yearn code with generics to improve type-safety

/**
 *
 *
 * below: taken from yearn
 */
// convert tuples
export function struct(tuple: any): any {
  if (typeof tuple !== 'object') return tuple;
  const keys = Object.keys(tuple);

  // check if tuple is actually an array
  // [1, 2, 3] => array vs [1, 2, 3, "a": 1, "b": 2, "c": 3] => object
  // NOTE: [] are not picked up as array (see *)
  const properties = keys.filter(key => isNaN(Number(key)));
  if (properties.length === 0) return structArray(tuple);

  const copy: Record<string, unknown> = {};

  properties.forEach((property: string) => {
    const value = tuple[property];
    if (typeof value === 'object' && !isBigNumberish(value)) {
      // recursive!
      copy[property] = struct(value);
    } else if (Array.isArray(value)) {
      // (*) all empty arrays are picked up here
      copy[property] = value;
    } else if (isBigNumberish(value)) {
      // all BigNumbers are converted to strings
      copy[property] = value.toString();
    } else {
      copy[property] = value;
    }
  });

  return copy;
}

// convert arrays
export function structArray(tuples: any[]): any[] {
  return tuples.map(tuple => struct(tuple));
}
