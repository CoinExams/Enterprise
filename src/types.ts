/** SDK configuration */
export interface ConfigSDK {
    apiKey: string,
    hmacKey: string,
    consoleLogEnabled: boolean,
};

/** Exchanges Ids */
export type ExchIds = `bin`;

/** Exchange user data */
export interface ExchData {
    /** holdings on exchange */
    holdings: { [sy: string]: number },

    /** positive numbers for buy, negative for sell */
    trades?: { [sy: string]: number },

    /** Time traded last ms */
    lastTraded?: number,

    /** Next trade check ms */
    nextCheck: number,

    /** exchange Id */
    exchId?: ExchIds,
}

/** Exchange Holdings */
export interface ExchangeHoldings {
    [sy: string]: number
}

/** Portfolio Settings */
export interface PortSettings {
    /** 1 trade on | 0 trade off */
    rb?: 1 | 0,

    /** coins included list */
    lst?: string[],

    /** wallets holdings outside exchange, example { BTC: 0.01 } */
    wal?: { [sy: string]: number },

    /** manual distribution percentage, example for 50% { BTC: 50 } */
    man?: { [sy: string]: number },

    /** coinset Id */
    coinSetId?: string,

    /** exchange Id */
    exchId?: ExchIds,
};

/** Portfolio Exchange API */
export interface PortfolioExchAPI {
    /** Portfolio Id */
    portId: string,
    /** exchange Id */
    exchId: ExchIds,
    /** exchange API key 1 */
    k1: string,
    /** exchange API key 2 */
    k2: string,
}

/** New Coinset */
export interface CoinsetNew {
    /** exchange Id */
    exchId: ExchIds,
    /** example [`BTC`,`ETH`], minimum two symbols */
    coinSet: string[],
}

/** Delete Coinset */
export interface CoinsetDelete {
    /** exchange Id */
    exchId: ExchIds,
    /** Coin Set Id String */
    coinSetId: string,
}

/** Coinset Update */
export interface CoinsetUpdate {
    /** exchange Id */
    exchId: ExchIds,
    /** Coin Set Id String */
    coinSetId: string,
    /** example [`BTC`,`ETH`], minimum two symbols */
    coinSet: string[],
}

/** Coinsets Data */
export interface CoinsetsData {
    [exchId: string]: {
        [coinSetId: string]: string[]
    }
}