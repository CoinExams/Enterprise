# CoinExams Enterprise
CoinExams Enterprise APIs uses HMAC authentication to protect the data in transit. Thus, it is required to include the API key in request body and sign all requests with HMAC key. All requests are using POST method for ease, reliability, and security.

## Installation
Install using `yarn add coinexams` or `npm install coinexams` 

OR use in browsers through CDN
`<script src="https://cdn.jsdelivr.net/npm/coinexams@1.0.3/dist/coinexams.min.js"></script>`

## CoinExams API keys
Start by add api keys using `config({ apiKey, hmacKey })`
Validate current configuration using `getConfig()`

## Portfolios
### Portfolios Settings
Latest settings for all portfolios `portfolioSettings(portId)`
Optional `portId` can be omitted to get all portfolios

### Portfolios Trades
Latest trades for all portfolios `portfolioTrades(portId)`
Optional `portId` can be omitted to get all portfolios

Error return `{ e: 'no_trades' | 'access_expired' }`
For `access_expired` please contact support to renew API access

### Portfolio New
Create a new portfolio and get portfolio ID `portfolioNew(portSettings)`
Optional `portSettings` can be omitted to use default settings
Returns new `portId`

### Portfolio Update
Update an existing portfolio using portfolio ID `portfolioUpdate({ portId, portSettings })`
Returns `portId` as confirmation

### Portfolio Exchange APIs
Add or update exchange API keys for a given exchange
`portfolioExchAPI = async ({ portId, exchId, key1, key2 })`
Returns `ExchangeHoldings` as `holdings` 

Error return `{ e: 'api_renew' | 'api_invalid' }`
For `api_renew` user has to check exchange for expired API access

### Portfolio Delete
Delete an existing portfolio using portfolio ID `portfolioDelete(portId)`
Returns `portId` as confirmation

## Coinsets
### Coinsets All
All coin sets created `coinSetsAll(exchId)`
Optional `exchId` can be omitted to get all exchanges

### Coinset Options
Get a list of all possible token symbols `coinSetsOptions(exchId)`
Must define `exchId` since options vary for each exchange

### Coinset New
Create a new coin set and get coin set ID `coinSetsNew({ exchId, coinSet })`
Error return `{ e: 'symbols_insufficient' | '${symbol} symbol_invalid' }`

### Coinset Update
Update an existing coin set using coin set ID `coinSetsUpdate({ exchId, coinSetId, coinSet })`
Error return `{ e: 'symbols_insufficient' | '${symbol} symbol_invalid' }`

### Coinset Delete
Delete an existing coin set using coin set ID `coinSetsDelete({ exchId, coinSetId })`
Returns `coinSetId` as confirmation