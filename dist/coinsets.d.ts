import { CoinsetDelete, CoinsetsData, CoinsetUpdate, CoinsetNew, ExchIds, CoinsetId, CoinsetError } from "./types";
declare const 
/**
 * Coin Sets :
 * All coin sets created
 * */
coinSetsAll: (exchId?: ExchIds) => Promise<CoinsetsData | undefined>, 
/**
 * Coin Sets Options :
 * Get a list of all possible token symbols
 * */
coinSetsOptions: (exchId: ExchIds) => Promise<string[]>, 
/**
 * Coin Sets New :
 * Create a new coin set and get coin set ID
 * */
coinSetsNew: ({ exchId, coinSet, }: CoinsetNew) => Promise<CoinsetId | CoinsetError | undefined>, 
/**
 * Coin Sets Update :
 * Update an existing coin set using coin set ID
 * */
coinSetsUpdate: ({ exchId, coinSetId, coinSet, }: CoinsetUpdate) => Promise<CoinsetId | CoinsetError | undefined>, 
/**
* Coin Sets Delete :
* Delete an existing coin set using coin set ID
* */
coinSetsDelete: ({ exchId, coinSetId, }: CoinsetDelete) => Promise<CoinsetId | undefined>;
export { coinSetsAll, coinSetsOptions, coinSetsNew, coinSetsUpdate, coinSetsDelete, };
