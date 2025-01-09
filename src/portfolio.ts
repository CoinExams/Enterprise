import { invalidStr, logErr, requestFun } from "./config";
import { ExchangeHoldings, PortfolioExchAPI, ExchData, PortSettings as PortSettings } from "./types";

const

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
        [portId: string]: PortSettings
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
                    [portId: string]: PortSettings
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
        [portId: string]: ExchData
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
                    [portId: string]: ExchData
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
        settings?: PortSettings
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
        settings: PortSettings,
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
    }: PortfolioExchAPI): Promise<{
        /** Portfolio Id */
        portId: string,
        /** holdings on exchange */
        holdings: ExchangeHoldings
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
    };

export {
    portfolioSettings,
    portfolioTrades,
    portfolioNew,
    portfolioUpdate,
    portfolioExchAPI,
    portfolioDelete,
};