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

/** Exchange data all users */
export interface ExchDataAll {
    [portId: string]: ExchData
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

/** Portfolio ID return */
export interface PortfolioId {
    /** Portfolio Id String */
    portId: string,
}

/** Portfolio Trades Error */
export interface PortfolioTradesError {
    e: `no_trades` | `access_expired`
}

/** Portfolio Update */
export interface PortfolioUpdate {
    /** Portfolio Id */
    portId: string,
    /** Portfolio Settings */
    portSettings: PortSettings,
}

/** Portfolio Settings All */
export interface PortSettingsAll {
    [portId: string]: PortSettings
}

/** Portfolio Settings All Stringified */
export interface PortSettingsAllString {
    [portId: string]: string
}

/** Portfolio Exchange API */
export interface PortfolioExchAPI {
    /** Portfolio Id */
    portId: string,
    /** exchange Id */
    exchId: ExchIds,
    /** exchange API key 1 */
    key1: string,
    /** exchange API key 2 */
    key2: string,
}

/** Portfolio Exchange API Return */
export interface PortfolioExchAPIReturn {
    /** Portfolio Id */
    portId: string,
    /** holdings on exchange */
    holdings: ExchangeHoldings
}

/** Portfolio Exchange API Error */
export interface PortfolioExchAPIError {
    e: `api_renew` | `api_invalid`
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

/** Coinset Id return */
export interface CoinsetId {
    /** Coin Set Id String */
    coinSetId: string,
}

/** Coinset Error */
export interface CoinsetError {
    e: `symbols_insufficient` | `BTC symbol_invalid`
}