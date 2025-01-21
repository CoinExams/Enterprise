import {
    invalidStr,
    logErr,
    requestFun,
} from "./config";
import {
    PortfolioExchAPI,
    PortSettings,
    ExchDataAll,
    PortSettingsAll,
    PortSettingsAllString,
    PortfolioUpdate,
    PortfolioExchAPIReturn,
    PortfolioExchAPIError,
    PortfolioTradesError,
    PortfolioId,
} from "./types";

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
    ): Promise<PortSettingsAll> => {
        const endPoint = `portfolios/all`;
        try {
            const
                data: { users: PortSettingsAllString } =
                    await requestFun(
                        endPoint,
                        invalidStr([portId]) ? undefined
                            : { portId }
                    ),
                usersRaw = data?.users,
                users: PortSettingsAll = {};
            if (!usersRaw) return {}
            for (const portId in usersRaw)
                users[portId] = JSON.parse(usersRaw[portId])
            return users
        } catch (e) {
            logErr(e, endPoint);
            return {}
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
    ): Promise<
        ExchDataAll
        | PortfolioTradesError
        | undefined> => {
        const endPoint = `portfolios/trades`;
        try {
            const
                data = await requestFun(
                    endPoint,
                    invalidStr([portId]) ? undefined
                        : { portId }
                ),
                exchangesData: ExchDataAll = data?.exchanges;
            return exchangesData || data
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
        /** User wallet address (for payment validation) */
        payingWallet: string,
        /** Portfolio Settings (optional) */
        portSettings?: PortSettings
    ): Promise<PortfolioId | undefined> => {
        const endPoint = `portfolios/add`;
        try {
            const
                settings = !portSettings ? undefined
                    : JSON.stringify(portSettings),
                data: PortfolioId | undefined = await requestFun(
                    endPoint,
                    invalidStr([settings]) ? undefined
                        : { settings, payingWallet }
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
        portSettings,
    }: PortfolioUpdate): Promise<PortfolioId | undefined> => {
        const endPoint = `portfolios/update`;
        try {
            const
                settings = !portSettings ? undefined
                    : JSON.stringify(portSettings),
                data: PortfolioId | undefined =
                    invalidStr([portId, settings]) ? undefined
                        : await requestFun(
                            endPoint,
                            {
                                portId,
                                settings
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
        key1,
        key2,
    }: PortfolioExchAPI): Promise<
        PortfolioExchAPIReturn
        | PortfolioExchAPIError
        | undefined
    > => {
        const endPoint = `portfolios/api`;
        try {

            if (invalidStr([key1, key2]))
                return { e: `api_invalid` }

            const
                data:
                    PortfolioExchAPIReturn
                    | PortfolioExchAPIError
                    | undefined = invalidStr([portId, exchId]) ? undefined
                        : await requestFun(
                            endPoint,
                            {
                                portId,
                                exchId,
                                k1: key1,
                                k2: key2
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
    ): Promise<PortfolioId | undefined> => {
        const endPoint = `portfolios/delete`;
        try {
            const
                data: PortfolioId | undefined = invalidStr([portId]) ? undefined
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