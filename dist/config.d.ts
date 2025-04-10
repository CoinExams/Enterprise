import { APISpecs, ClientPayments, ConfigSDK, ResultPromise } from './types';
import { ChainIds } from 'merchantslate';
declare const 
/** Get SDK configuration */
getConfig: () => ConfigSDK, 
/** Configure SDK */
config: ({ apiKey, hmacKey, payId, payChain, consoleLogEnabled, }: {
    apiKey?: string;
    hmacKey?: string;
    payId?: string;
    payChain?: ChainIds;
    consoleLogEnabled?: boolean;
}) => Promise<void>, 
/** Invalid Strings Check */
invalidStr: (params: (string | undefined)[]) => boolean, 
/** Log Function Error */
logErr: (e: any, endPoint?: string) => void, 
/** Main Request Function */
requestFun: (endPoint: string, reqParm?: any) => Promise<any>, 
/** API data */
accountInfo: () => ResultPromise<APISpecs>, 
/** API payments list */
accountPayments: () => ResultPromise<ClientPayments[]>;
export { getConfig, config, logErr, invalidStr, requestFun, accountInfo, accountPayments, };
