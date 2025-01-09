import {
    exchData,
    exchIds,
    portSettings,
} from "./types";
import { createHmac } from 'crypto';

const
    /** Package configuration */
    configuration = {
        apiKey: ``,
        hmacKey: ``,
        consoleLogEnabled: true,
    },
    /** Configure package */
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
        if (consoleLogEnabled != undefined) configuration.consoleLogEnabled = consoleLogEnabled;
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
    },

    /** 
     * Portfolios Settings :
     * Latest settings for all portfolios
     * or pass a single portfolio portfolio Id portId for specific data
     * @returns empty object when no portfolios
     * */
    portfolioSettings = async (
        /** Portfolio Id (optional) */
        portId?: string
    ): Promise<{
        [portId: string]: portSettings
    } | undefined> => {
        const endPoint = `portfolios/all`;
        try {
            const
                data: {
                    users: {
                        [portId: string]: string
                    }
                } = await requestFun(
                    endPoint,
                    invalidStr([portId]) ? undefined
                        : { portId }
                ),
                usersRaw = data?.users,
                users: {
                    [portId: string]: portSettings
                } = {};
            if (!usersRaw) return
            for (const portId in usersRaw)
                users[portId] = JSON.parse(usersRaw[portId])
            return users
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Portfolios Trades :
     * Latest trades for all portfolios
     * or pass a single portfolio portfolio Id portId for specific data
     * @returns empty object when no trades
     * */
    portfolioTrades = async (
        /** Portfolio Id (optional) */
        portId?: string
    ): Promise<{
        [portId: string]: exchData
    } | undefined> => {
        const endPoint = `portfolios/trades`;
        try {
            const
                data = await requestFun(
                    endPoint,
                    invalidStr([portId]) ? undefined
                        : { portId }
                ),
                exchangesData: {
                    [portId: string]: exchData
                } = data?.exchanges;
            return exchangesData
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Portfolio New :
     * Create a new portfolio and get portfolio ID
     * @returns new portfolio id string
     * */
    portfolioNew = async (
        /** Portfolio Settings (optional) */
        settings?: portSettings
    ): Promise<{
        /** Portfolio Id String */
        portId: string,
    } | undefined> => {
        const endPoint = `portfolios/add`;
        try {
            const
                settingsString = !settings ? undefined : JSON.stringify(settings),
                data: {
                    /** Portfolio Id String */
                    portId: string,
                } | undefined = await requestFun(
                    endPoint,
                    invalidStr([settingsString]) ? undefined
                        : { settings: settingsString }
                );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Portfolio Update :
     * Update an existing portfolio using portfolio ID
     * @returns portfolio id string
     * */
    portfolioUpdate = async ({
        portId,
        settings,
    }: {
        /** Portfolio Id */
        portId: string,
        /** Portfolio Settings */
        settings: portSettings,
    }): Promise<{
        /** Portfolio Id String */
        portId: string,
    } | undefined> => {
        const endPoint = `portfolios/update`;
        try {
            const
                settingsString = !settings ? undefined : JSON.stringify(settings),
                data: {
                    /** Portfolio Id String */
                    portId: string,
                } | undefined = invalidStr([portId, settingsString]) ? undefined
                        : await requestFun(
                            endPoint,
                            {
                                portId,
                                settings: settingsString
                            }
                        );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Portfolio Exchange APIs :
     * Add or update exchange API keys for a given exchange
     * @returns portfolio id string and holdings on exchange
     * */
    portfolioExchAPI = async ({
        portId,
        exchId,
        k1,
        k2,
    }: {
        /** Portfolio Id */
        portId: string,
        /** exchange Id */
        exchId: exchIds,
        /** exchange API key 1 */
        k1: string,
        /** exchange API key 2 */
        k2: string,
    }): Promise<{
        /** Portfolio Id */
        portId: string,
        /** holdings on exchange */
        holdings: { [sy: string]: number }
    } | { e: `api_renew` | `api_invalid` } | undefined> => {
        const endPoint = `portfolios/api`;
        try {

            if (invalidStr([k1, k2]))
                return { e: `api_invalid` }

            const
                data:
                    {
                        /** Portfolio Id */
                        portId: string,
                        /** holdings on exchange */
                        holdings: { [sy: string]: number }
                    }
                    | { e: `api_renew` | `api_invalid` }
                    | undefined = invalidStr([portId, exchId]) ? undefined
                        : await requestFun(
                            endPoint,
                            {
                                portId,
                                exchId,
                                k1,
                                k2
                            }
                        );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Portfolio Delete :
     * Delete an existing portfolio using portfolio ID
     * @returns portfolio id string
     * */
    portfolioDelete = async (
        /** Portfolio Id */
        portId: string,
    ): Promise<{
        /** Portfolio Id String */
        portId: string,
    } | undefined> => {
        const endPoint = `portfolios/delete`;
        try {
            const
                data: {
                    /** Portfolio Id String */
                    portId: string,
                } | undefined = invalidStr([portId]) ? undefined
                        : await requestFun(
                            endPoint,
                            { portId }
                        );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Coin Sets :
     * All coin sets created
     * */
    coinSetsAll = async (
        /** exchange Id */
        exchId?: exchIds
    ): Promise<{
        [exchId: string]: {
            [coinSetId: string]: string[]
        }
    } | undefined> => {
        const endPoint = `coinsets/all`;
        try {
            const
                data: {
                    [exchId: string]: {
                        [coinSetId: string]: string[]
                    }
                } | undefined = await requestFun(
                    endPoint,
                    invalidStr([exchId]) ? undefined
                        : { exchId }
                );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Coin Sets Options :
     * Get a list of all possible token symbols
     * */
    coinSetsOptions = async (
        /** exchange Id */
        exchId: exchIds
    ): Promise<string[]> => {
        const endPoint = `coinsets/options`;
        try {
            const
                data: {
                    options: string[],
                } = invalidStr([exchId]) ? undefined
                        : await requestFun(
                            endPoint,
                            { exchId }
                        );
            return data?.options || []
        } catch (e) {
            logErr(e, endPoint);
            return []
        };
    },

    /**
     * Coin Sets New :
     * Create a new coin set and get coin set ID
     * */
    coinSetsNew = async ({
        exchId,
        coinSet,
    }: {
        /** exchange Id */
        exchId: exchIds,
        /** example [`BTC`,`ETH`], minimum two symbols */
        coinSet: string[],
    }): Promise<{ coinSetId: string } | { e: string } | undefined> => {
        const endPoint = `coinsets/add`;
        try {

            if (coinSet?.length < 2)
                return { e: `symbols_insufficient` };

            const
                data: {
                    /** Coin Set Id String */
                    coinSetId: string,
                } = invalidStr([exchId?.toString()].concat(coinSet)) ? undefined
                        : await requestFun(
                            endPoint,
                            { exchId, coinSet }
                        );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
     * Coin Sets Update :
     * Update an existing coin set using coin set ID
     * */
    coinSetsUpdate = async ({
        exchId,
        coinSetId,
        coinSet,
    }: {
        /** exchange Id */
        exchId: exchIds,
        /** Coin Set Id String */
        coinSetId: string,
        /** example [`BTC`,`ETH`], minimum two symbols */
        coinSet: string[],
    }): Promise<{ coinSetId: string } | { e: string } | undefined> => {
        const endPoint = `coinsets/update`;
        try {

            if (coinSet?.length < 2)
                return { e: `symbols_insufficient` };

            const
                data: {
                    /** Coin Set Id String */
                    coinSetId: string,
                } = invalidStr([coinSetId, exchId?.toString()].concat(coinSet)) ? undefined
                        : await requestFun(
                            endPoint,
                            { coinSetId, exchId, coinSet }
                        );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    },

    /**
    * Coin Sets Delete :
    * Delete an existing coin set using coin set ID
    * */
    coinSetsDelete = async ({
        exchId,
        coinSetId,
    }: {
        /** exchange Id */
        exchId: exchIds,
        /** Coin Set Id String */
        coinSetId: string,
    }): Promise<{ coinSetId: string } | undefined> => {
        const endPoint = `coinsets/delete`;
        try {

            const
                data: {
                    /** Coin Set Id String */
                    coinSetId: string,
                } = invalidStr([coinSetId, exchId?.toString()]) ? undefined
                        : await requestFun(
                            endPoint,
                            { exchId, coinSetId }
                        );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    };

export {
    config,
    portfolioSettings,
    portfolioTrades,
    portfolioNew,
    portfolioUpdate,
    portfolioExchAPI,
    portfolioDelete,
    coinSetsAll,
    coinSetsOptions,
    coinSetsNew,
    coinSetsUpdate,
    coinSetsDelete,
};