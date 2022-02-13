import { providers } from 'ethers';
import { IOpiumV2SDKConfig, TConfigByChain } from '../types/misc';
import { configByChain } from '../utils/misc';
import { SDKError } from './sdkError';
import { chainIds, sdkErrors } from '../constants';

export class SDKContext {
  private readonly provider$: providers.JsonRpcProvider;

  private readonly chainId$: number;

  private readonly networkConfig$: TConfigByChain;

  constructor(_config: IOpiumV2SDKConfig) {
    this.chainId$ = _config.chainId;
    if (_config.override) {
      this.provider$ = new providers.Web3Provider(_config.override);
    } else {
      this.provider$ = new providers.JsonRpcProvider(_config.rpcUrl);
    }
    const networkConfig = configByChain(chainIds, _config.chainId);
    if (!networkConfig) {
      throw new SDKError(sdkErrors.UNSUPPORTED_CHAIN);
    } else {
      this.networkConfig$ = networkConfig;
    }
  }

  public getProvider(): providers.JsonRpcProvider {
    return this.provider$;
  }

  public getChainId(): number {
    return this.chainId$;
  }

  public getNetworkConfig(): TConfigByChain {
    return this.networkConfig$;
  }
}
