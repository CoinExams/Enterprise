import {
    requestFun,
    invalidStr,
    logErr,
} from "./config";
import {
    CoinsetDelete,
    CoinsetsData,
    CoinsetUpdate,
    CoinsetNew,
    ExchIds,
    CoinsetId,
    CoinsetError,
} from "./types";

const

    /**
     * Coin Sets :
     * All coin sets created
     * */
    coinSetsAll = async (
        /** exchange Id */
        exchId?: ExchIds
    ): Promise<CoinsetsData | undefined> => {
        const endPoint = `coinsets/all`;
        try {
            const
                data: CoinsetsData = await requestFun(
                    endPoint,
                    invalidStr([exchId]) ?
                        undefined : { exchId }
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
        exchId: ExchIds
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
    }: CoinsetNew): Promise<
        CoinsetId
        | CoinsetError
        | undefined
    > => {
        const endPoint = `coinsets/add`;
        try {

            if (coinSet?.length < 2)
                return { e: `symbols_insufficient` };

            const
                data: CoinsetId =
                    invalidStr([exchId?.toString()]
                        ?.concat(coinSet)) ? undefined
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
    }: CoinsetUpdate): Promise<
        CoinsetId
        | CoinsetError
        | undefined
    > => {
        const endPoint = `coinsets/update`;
        try {

            if (coinSet?.length < 2)
                return { e: `symbols_insufficient` };

            const
                data: CoinsetId =
                    invalidStr([coinSetId, exchId?.toString()]
                        ?.concat(coinSet)) ? undefined
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
    }: CoinsetDelete): Promise<
        CoinsetId
        | undefined
    > => {
        const endPoint = `coinsets/delete`;
        try {

            const
                data: CoinsetId =
                    invalidStr([coinSetId, exchId?.toString()])
                        ? undefined
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
    coinSetsAll,
    coinSetsOptions,
    coinSetsNew,
    coinSetsUpdate,
    coinSetsDelete,
};