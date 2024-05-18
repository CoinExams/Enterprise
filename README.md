# CoinExams Enterprise API

## Setup
CoinExams API uses HMAC authentcation to protect the data in transit. Thus, it is required to include the API key in request body and sign all requests with HMAC key.

## Types
### Portfolio Settings
```
interface portSettings {
    /** trade on (1) / off (2) */
    rb: 1 | 0,
    /** coins included list */
    lst: string[],
    /** wallets holdings outside exchange */
    wal?: {
        /** example, BTC:0.01 */
        [sy: string]: number
    },
    /** manual distribution percentage */
    man?: {
        /** example for 50%, BTC:50 */
        [sy: string]: number
    },
}
```

## Endpoints
### Portfolio Update
baseURL `portfolios/update`
```
body: {
  portId: portId, // Portfolio Id String
  w: JSON.stringify(portSettings), // Portfolio Settings Stringified
}
```
