# CoinExams Enterprise API

## Setup
CoinExams API uses HMAC authentcation to protect the data in transit. Thus, it is required to include the API key in request body and sign all requests with HMAC key. All requests are using POST method for ease, reliablity, and security.
### Base URL
```
cosnt baseURL = `https://api.coinexams.com/v1/`;
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
	rb: 1 | 0, // trade on (1) / off (2)
	lst: string[], // coins included list
	wal?: // wallets holdings outside exchange
		{ [sy: string]: number }, // example, BTC:0.01 
	man?: // manual distribution percentage
		{ [sy: string]: number } // example for 50%, BTC:50
}
```
### Exchange Data
```
interface exchData {
	holdings: // holdings on exchange
		JSON.stringify({ [sy: string]: number }), 
	trades?: // positive numbers for buy, negative for sell
		JSON.stringify({ [sy: string]: number }), 
	lastTraded?: number, // Time traded last ms
	nextCheck: number // Next trade check ms
}
```

## Endpoints
Manage all portfolios created using API in your managing account

### Portfolios Settings
Latest settings for all portfolios

endPoint `portfolios/all`
```
body: {}

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
body: {}

response: {
	exchanges: {
		[portId: string]: {
			bin: exchData
		}
	}
}

error: `no_trades`
```

### Portfolio New
Create a new portfolio and get portfolio ID

endPoint `portfolios/add`
```
body: {
	settings?: JSON.stringify(portSettings), // Portfolio Settings Stringified
}

response: {
	portId: string, // Portfolio Id String
}
```

### Portfolio Delete
Delete an existing portfolio using portfolio ID

endPoint `portfolios/delete`
```
body: {
	portId: string, // Portfolio Id String
}

response: {
	portId: string, // Portfolio Id String
}
```

### Portfolio Update
Update an existing portfolio using portfolio ID

endPoint `portfolios/update`
```
body: {
	portId: string, // Portfolio Id String
	settings: JSON.stringify(portSettings), // Portfolio Settings Stringified
}

response: {
	portId: string, // Portfolio Id String
}
```

### Portfolio Exchange APIs
Add or update exchange API keys for a given exchange

endPoint `portfolios/api`
```
body: {
	portId: string, // Portfolio Id String
	exchId: `bin`, // exchange Id, currently limited to `bin` (Binance)
	k1: Exchange_API_Key,
	k2: Exchange_API_Secret,
}

response: {
	portId: string, // Portfolio Id String
	holdings: { [sy: string]: number } // holdings on exchange
}

error: `api_renew` | `api_invalid`
```


### Coin Sets
All coin sets created

endPoint `coinsets/all`
```
body: {}

response: {
	coinSets: {
		[coinSetId: string]: string[] // [`BTC`,`ETH`]
	}
}
```

### Coin Set New
Create a new coin set and get coin set ID

endPoint `coinsets/add`
```
body: {
	coinSet: string[] // [`BTC`,`ETH`]
}

response: {
	coinSetId: string, // Coin Set Id String
}
```

### Coin Set Options
Get a list of all possible token symbols

endPoint `coinsets/options`
```
body: {
	exchId: `bin`
}

response: {
	options: string[], // [`BTC`,`ETH`]
}
```

### Coin Set Delete
Delete an existing coin set using coin set ID

endPoint `coinsets/delete`
```
body: {
	coinSetId: string, // Coin Set Id String
}

response: {
	coinSetId: string, // Coin Set Id String
}
```

### Coin Set Update
Update an existing coin set using coin set ID

endPoint `coinsets/update`
```
body: {
	coinSetId: string, // Coin Set Id String
	coinSet: string[] // [`BTC`,`ETH`]
}

response: {
	coinSetId: string, // Coin Set Id String
}
```
