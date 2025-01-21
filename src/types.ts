import { ChainIds } from "merchantslate";

/** SDK configuration */
interface ConfigSDK {
    /** API Key */
    apiKey: string,
    /** HMAC key */
    hmacKey: string,
    /** Log errors */
    consoleLogEnabled: boolean,
    /** Payment Id */
    payId?: string,
    /** payment chain */
    payChain?: ChainIds,
};

/** API Basics */
interface APIBasics {
    /** Client Name */
    clientName: string,
    /** Pay Chain */
    payChain?: `BSC`,
    /** Pay Id */
    payId?: string,
    /** max allowed user portfolio count */
    maxPorts: number,
    /** reference currency */
    cur: string,
    /** fee per portfolio */
    fee: number,
    /** paused */
    paused?: boolean,
    /** number of portfolios */
    portfolios: number,
}

/** API info */
interface APIInfo extends APIBasics {
    /** time requested */
    requested: number,
    /** time updated */
    updated: number,
}

/** API specifications */
interface APISpecs extends APIInfo {
    /** Client Id (User Account DB Id) */
    clientId: string,
    /** Client Name */
    clientName: string,
    /** API hmac EN */
    hmacEN: string,
}

/** Exchanges Ids */
type ExchIds = `bin`;

/** Exchange user data */
interface ExchData {
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
interface ExchDataAll {
    [portId: string]: ExchData
}

/** Exchange Holdings */
interface ExchangeHoldings {
    [sy: string]: number
}

/** Portfolio Settings */
interface PortSettings {
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
interface PortfolioId {
    /** Portfolio Id String */
    portId: string,
}

/** Portfolio Trades Error */
interface PortfolioTradesError {
    e: `no_trades` | `access_expired`
}

/** Portfolio Update */
interface PortfolioUpdate {
    /** Portfolio Id */
    portId: string,
    /** Portfolio Settings */
    portSettings: PortSettings,
}

/** Portfolio Settings All */
interface PortSettingsAll {
    [portId: string]: PortSettings
}

/** Portfolio Settings All Stringified */
interface PortSettingsAllString {
    [portId: string]: string
}

/** Portfolio Exchange API */
interface PortfolioExchAPI {
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
interface PortfolioExchAPIReturn {
    /** Portfolio Id */
    portId: string,
    /** holdings on exchange */
    holdings: ExchangeHoldings
}

/** Portfolio Exchange API Error */
interface PortfolioExchAPIError {
    e: `api_renew` | `api_invalid`
}

/** New Coinset */
interface CoinsetNew {
    /** exchange Id */
    exchId: ExchIds,
    /** example [`BTC`,`ETH`], minimum two symbols */
    coinSet: string[],
}

/** Delete Coinset */
interface CoinsetDelete {
    /** exchange Id */
    exchId: ExchIds,
    /** Coin Set Id String */
    coinSetId: string,
}

/** Coinset Update */
interface CoinsetUpdate {
    /** exchange Id */
    exchId: ExchIds,
    /** Coin Set Id String */
    coinSetId: string,
    /** example [`BTC`,`ETH`], minimum two symbols */
    coinSet: string[],
}

/** Coinsets Data */
interface CoinsetsData {
    [exchId: string]: {
        [coinSetId: string]: string[]
    }
}

/** Coinset Id return */
interface CoinsetId {
    /** Coin Set Id String */
    coinSetId: string,
}

/** Coinset Error */
interface CoinsetError {
    e: `symbols_insufficient` | `BTC symbol_invalid`
}


export {
    // configuration
    ConfigSDK,
    APISpecs,

    // exchanges
    ExchIds,
    ExchData,
    ExchDataAll,
    ExchangeHoldings,

    // portfolios
    PortSettings,
    PortfolioId,
    PortfolioTradesError,
    PortfolioUpdate,
    PortSettingsAll,
    PortSettingsAllString,
    PortfolioExchAPI,
    PortfolioExchAPIReturn,
    PortfolioExchAPIError,

    // coinsets
    CoinsetNew,
    CoinsetDelete,
    CoinsetUpdate,
    CoinsetsData,
    CoinsetId,
    CoinsetError,
};