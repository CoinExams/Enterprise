import { APISpecs, CEConfig, ClientPayments, ConfigSDK, ResultPromise } from './types';
declare const 
/** Get SDK configuration */
getConfig: () => ConfigSDK, 
/** Configure SDK */
config: ({ apiKey, hmacKey, payId, payChain, payRPC, consoleLogEnabled, }: CEConfig) => Promise<void>, 
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
