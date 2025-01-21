import { createHmac } from 'crypto';
import { ConfigSDK } from './types';

const
    /** SDK configuration */
    configuration: ConfigSDK = {
        apiKey: ``,
        hmacKey: ``,
        consoleLogEnabled: true,
    },
    /** Get SDK configuration */
    getConfig = () => {
        return configuration
    },
    /** Configure SDK */
    config = ({
        apiKey,
        hmacKey,
        consoleLogEnabled,
    }: {
        apiKey?: string,
        hmacKey?: string,
        consoleLogEnabled?: boolean
    }) => {
        if (apiKey) configuration.apiKey = apiKey;
        if (hmacKey) configuration.hmacKey = hmacKey;
        if (consoleLogEnabled != undefined)
            configuration.consoleLogEnabled = consoleLogEnabled;
    },
    /** CoinExams Base API URL  */
    baseURL: string = `https://api.coinexams.com/v1/`,
    /** Invalid Strings Check */
    invalidStr = (params: (string | undefined)[]) => {
        try {
            for (let i = 0; i < params.length; i++) {
                const p = params[i];
                if (!p || typeof p != `string`)
                    return true
            }
            return false
        } catch {
            return true
        };
    },
    /** Log Function Error */
    logErr = (e: any, endPoint?: string) => {
        if (!configuration.consoleLogEnabled) return
        try {
            console.log(endPoint, `CoinExams API error`, e);
        } catch (error) {
            console.log(`CoinExams API error`);
        };
    },
    /** Main Request Function */
    requestFun = async (
        endPoint: string,
        reqParm?: any,
    ) => {
        try {
            const
                body = {
                    key: configuration.apiKey,
                    ...reqParm || {}
                },
                signature = createHmac(`sha256`, configuration.hmacKey)
                    .update(JSON.stringify(body))
                    .digest(`hex`),
                res = await fetch(
                    baseURL + endPoint,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...body,
                            signature
                        })
                    }
                ),
                result: any = await res.json();

            // request error
            if (
                result?.e
                && configuration.consoleLogEnabled
            ) {
                console.log(`error`, result.e);

                // request success
            } else return await result;
        } catch (e) {
            logErr(e);
            return
        };
    };

export {
    getConfig,
    config,
    logErr,
    invalidStr,
    requestFun
}