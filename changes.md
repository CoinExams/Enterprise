
## CoinExams Enterprise - Change Log

### 15 April 2025 
`ExchData` updated to carry data for all exchanges related to a given portfolio

* `holdings` now has object of exchanges Ids and their holdings
* `trades` now has object of exchanges Ids and respective trades

### 5 April 2025
`ExchIds` type has been updated to follow `ccxt` unified exchanges standard

* Example `bin` has to be updated to `binance`

Currently, we have a fallback for legacy implementations but this to be removed in the future.