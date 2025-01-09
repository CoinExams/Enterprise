import { ConfigSDK } from './types';
declare const 
/** Get SDK configuration */
getConfig: () => ConfigSDK, 
/** Configure SDK */
config: ({ apiKey, hmacKey, consoleLogEnabled, }: {
    apiKey?: string;
    hmacKey?: string;
    consoleLogEnabled?: boolean;
}) => void, 
/** Invalid Strings Check */
invalidStr: (params: (string | undefined)[]) => boolean, 
/** Log Function Error */
logErr: (e: any, endPoint?: string) => void, 
/** Main Request Function */
requestFun: (endPoint: string, reqParm?: any) => Promise<any>;
export { getConfig, config, logErr, invalidStr, requestFun };
