/** Exchanges Ids */
export type exchIds = `bin`;
/** Portfolio Settings */
export interface portSettings {
    /** 1 trade on | 0 trade off */
    rb?: 1 | 0;
    /** coins included list */
    lst?: string[];
    /** wallets holdings outside exchange, example { BTC: 0.01 } */
    wal?: {
        [sy: string]: number;
    };
    /** manual distribution percentage, example for 50% { BTC: 50 } */
    man?: {
        [sy: string]: number;
    };
    /** coinset Id */
    coinSetId?: string;
    /** exchange Id */
    exchId?: exchIds;
}
/** Exchange user data */
export interface exchData {
    /** holdings on exchange */
    holdings: {
        [sy: string]: number;
    };
    /** positive numbers for buy, negative for sell */
    trades?: {
        [sy: string]: number;
    };
    /** Time traded last ms */
    lastTraded?: number;
    /** Next trade check ms */
    nextCheck: number;
    /** exchange Id */
    exchId?: exchIds;
}
