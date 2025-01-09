import { exchData, exchIds, portSettings } from "./types";
declare const 
/** Configure package */
config: ({ apiKey, hmacKey, consoleLogEnabled, }: {
    apiKey?: string;
    hmacKey?: string;
    consoleLogEnabled?: boolean;
}) => void, 
/**
 * Portfolios Settings :
 * Latest settings for all portfolios
 * or pass a single portfolio portfolio Id portId for specific data
 * @returns empty object when no portfolios
 * */
portfolioSettings: (portId?: string) => Promise<{
    [portId: string]: portSettings;
} | undefined>, 
/**
 * Portfolios Trades :
 * Latest trades for all portfolios
 * or pass a single portfolio portfolio Id portId for specific data
 * @returns empty object when no trades
 * */
portfolioTrades: (portId?: string) => Promise<{
    [portId: string]: exchData;
} | undefined>, 
/**
 * Portfolio New :
 * Create a new portfolio and get portfolio ID
 * @returns new portfolio id string
 * */
portfolioNew: (settings?: portSettings) => Promise<{
    /** Portfolio Id String */
    portId: string;
} | undefined>, 
/**
 * Portfolio Update :
 * Update an existing portfolio using portfolio ID
 * @returns portfolio id string
 * */
portfolioUpdate: ({ portId, settings, }: {
    /** Portfolio Id */
    portId: string;
    /** Portfolio Settings */
    settings: portSettings;
}) => Promise<{
    /** Portfolio Id String */
    portId: string;
} | undefined>, 
/**
 * Portfolio Exchange APIs :
 * Add or update exchange API keys for a given exchange
 * @returns portfolio id string and holdings on exchange
 * */
portfolioExchAPI: ({ portId, exchId, k1, k2, }: {
    /** Portfolio Id */
    portId: string;
    /** exchange Id */
    exchId: exchIds;
    /** exchange API key 1 */
    k1: string;
    /** exchange API key 2 */
    k2: string;
}) => Promise<{
    /** Portfolio Id */
    portId: string;
    /** holdings on exchange */
    holdings: {
        [sy: string]: number;
    };
} | {
    e: `api_renew` | `api_invalid`;
} | undefined>, 
/**
 * Portfolio Delete :
 * Delete an existing portfolio using portfolio ID
 * @returns portfolio id string
 * */
portfolioDelete: (portId: string) => Promise<{
    /** Portfolio Id String */
    portId: string;
} | undefined>, 
/**
 * Coin Sets :
 * All coin sets created
 * */
coinSetsAll: (exchId?: exchIds) => Promise<{
    [exchId: string]: {
        [coinSetId: string]: string[];
    };
} | undefined>, 
/**
 * Coin Sets Options :
 * Get a list of all possible token symbols
 * */
coinSetsOptions: (exchId: exchIds) => Promise<string[]>, 
/**
 * Coin Sets New :
 * Create a new coin set and get coin set ID
 * */
coinSetsNew: ({ exchId, coinSet, }: {
    /** exchange Id */
    exchId: exchIds;
    /** example [`BTC`,`ETH`], minimum two symbols */
    coinSet: string[];
}) => Promise<{
    coinSetId: string;
} | {
    e: string;
} | undefined>, 
/**
 * Coin Sets Update :
 * Update an existing coin set using coin set ID
 * */
coinSetsUpdate: ({ exchId, coinSetId, coinSet, }: {
    /** exchange Id */
    exchId: exchIds;
    /** Coin Set Id String */
    coinSetId: string;
    /** example [`BTC`,`ETH`], minimum two symbols */
    coinSet: string[];
}) => Promise<{
    coinSetId: string;
} | {
    e: string;
} | undefined>, 
/**
* Coin Sets Delete :
* Delete an existing coin set using coin set ID
* */
coinSetsDelete: ({ exchId, coinSetId, }: {
    /** exchange Id */
    exchId: exchIds;
    /** Coin Set Id String */
    coinSetId: string;
}) => Promise<{
    coinSetId: string;
} | undefined>;
export { config, portfolioSettings, portfolioTrades, portfolioNew, portfolioUpdate, portfolioExchAPI, portfolioDelete, coinSetsAll, coinSetsOptions, coinSetsNew, coinSetsUpdate, coinSetsDelete, };
