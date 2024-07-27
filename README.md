# CoinExams Enterprise API

## Setup
CoinExams API uses HMAC authentication to protect the data in transit. Thus, it is required to include the API key in request body and sign all requests with HMAC key. All requests are using POST method for ease, reliability, and security.
### Base URL
```
const baseURL = `https://api.coinexams.com/v1/`;
```
### Request Signed
```
import { createHmac } from "node:crypto";
import fetch from "node-fetch";

const
    baseURL: string = `https://api.coinexams.com/v1/`,
    key: string = `API Key`,
    hmacKey: string = `API HMAC Key`,
    requestFunction = async (
        endPoint: string,
        reqParm?: any
    ) => {
        const
            body = {
                key,
                ...reqParm || {}
            },
            signature = createHmac(`sha256`, hmacKey)
                .update(JSON.stringify(body))
                .digest(`hex`),
            res = await fetch(
                baseURL + endPoint,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...body,
                        signature
                    })
                }
            ),
            result: any = await res.json();

        // request error
        if (result?.e) console.log(`error`, result.e);

        // request success
        else return await result;
    };
```

## Data Types
### Portfolio Settings
```
interface portSettings {
	/** 1 trade on | 0 trade off */
	rb: 1 | 0,

	/** coins included list */
	lst: string[],

	/** wallets holdings outside exchange, example { BTC: 0.01 } */
	wal?: { [sy: string]: number },

	/** manual distribution percentage, example for 50% { BTC: 50 } */
	man?: { [sy: string]: number },
}
```
### Exchange Data
```
interface exchData {
	/** holdings on exchange */
	holdings: { [sy: string]: number },

	/** positive numbers for buy, negative for sell */
	trades?: { [sy: string]: number },

	/** Time traded last ms */
	lastTraded?: number,
	
	/** Next trade check ms */
	nextCheck: number,
	
	/** exchange Id */
   	exchId?: `bin`,
}
```

## Endpoints
Manage all portfolios created using API in your managing account

### Portfolios Settings
Latest settings for all portfolios

endPoint `portfolios/all`
```
body: {
	/** Portfolio Id String */
	portId?: string
}

response: {
	users: {
		[portId: string]: JSON.stringify(portSettings)
	}
}
```

### Portfolios Trades
Latest trades for all portfolios

endPoint `portfolios/trades`
```
body: {
	/** Portfolio Id String */
	portId?: string
}

response: {
	exchanges: {
		[portId: string]: exchData
	}
}

error: { e: `no_trades` }
```

### Portfolio New
Create a new portfolio and get portfolio ID

endPoint `portfolios/add`
```
body: {
	/** Portfolio Settings Stringified */
	settings?: JSON.stringify(portSettings),
}

response: {
	/** Portfolio Id String */
	portId: string,
}
```

### Portfolio Update
Update an existing portfolio using portfolio ID

endPoint `portfolios/update`
```
body: {
	/** Portfolio Id String */
	portId: string,

	/** Portfolio Settings Stringified */
	settings: JSON.stringify(portSettings),
}

response: {
	/** Portfolio Id String */
	portId: string,
}
```

### Portfolio Exchange APIs
Add or update exchange API keys for a given exchange

endPoint `portfolios/api`
```
body: {
	/** Portfolio Id String */
	portId: string,

	/** exchange Id, currently limited to `bin` (Binance) */
	exchId: `bin`,

	/** exchange API key 1 */
	k1: Exchange_API_Key,

	/** exchange API key 2 */
	k2: Exchange_API_Secret,
}

response: {
	/** Portfolio Id String */
	portId: string,

	/** holdings on exchange */
	holdings: { [sy: string]: number }
}

error: { e: `api_renew` | `api_invalid` }
```

### Portfolio Delete
Delete an existing portfolio using portfolio ID

endPoint `portfolios/delete`
```
body: {
	/** Portfolio Id String */
	portId: string,
}

response: {
	/** Portfolio Id String */
	portId: string,
}
```

### Coin Sets
All coin sets created

endPoint `coinsets/all`
```
body: {
	/** exchange Id, currently limited to `bin` (Binance) */
	exchId?: `bin`
}

response: {
	coinSets: {
		[coinSetId: string]: string[] // example [`BTC`,`ETH`]
	}
}
```

### Coin Set Options
Get a list of all possible token symbols

endPoint `coinsets/options`
```
body: {
	/** exchange Id, currently limited to `bin` (Binance) */
	exchId?: `bin`
}

response: {
	options: string[], // example [`BTC`,`ETH`]
}
```

### Coin Set New
Create a new coin set and get coin set ID

endPoint `coinsets/add`
```
body: {
	/** exchange Id, currently limited to `bin` (Binance) */
	exchId?: `bin`,

	/** example [`BTC`,`ETH`], minimum two symbols */
	coinSet: string[],
}

response: {
	/** Coin Set Id String */
	coinSetId: string,
}

error: { e: `symbols_insufficient` }
```

### Coin Set Update
Update an existing coin set using coin set ID

endPoint `coinsets/update`
```
body: {
	/** exchange Id, currently limited to `bin` (Binance) */
	exchId?: `bin`,

	/** Coin Set Id String */
	coinSetId: string,

	/** example [`BTC`,`ETH`], minimum two symbols */
	coinSet: string[],
}

response: {
	/** Coin Set Id String */
	coinSetId: string,
}

error: { e: `symbols_insufficient` }
```

### Coin Set Delete
Delete an existing coin set using coin set ID

endPoint `coinsets/delete`
```
body: {
	/** exchange Id, currently limited to `bin` (Binance) */
	exchId?: `bin`,

	/** Coin Set Id String */
	coinSetId: string,
}

response: {
	/** Coin Set Id String */
	coinSetId: string,
}
```