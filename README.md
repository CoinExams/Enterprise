# CoinExams Enterprise API

## Setup
CoinExams API uses HMAC authentcation to protect the data in transit. Thus, it is required to include the API key in request body and sign all requests with HMAC key. All requests are using POST method for ease, reliablity, and security.
### Base URL
```
cosnt baseURL = `https://api.coinexams.com/v1/`;
```
### Request Signed
```
import { createHmac } from 'node:crypto';
const
 hmacKey: string = `API HMAC Key`,
 key: string = `API Key`,
 requestFunction = async (
	endPoint: string, // e.g. `portfolios/all`
	reqParm: any // request parameters
) => {
	const
	    bodyParm = {
	        key,
	        ...reqParm
	    },
	    body = JSON.stringify(bodyParm)
	    coinexams_sig = createHmac(`sha256`, hmacKey)
	        .update(body)
	        .digest(`hex`),
	    headers = {
	        coinexams_sig,
	        "Content-Type": "application/json"
	    };
	
	return await fetch(
		baseURL + endPoint,
		{
			method: "POST",
			mode: "cors",
			headers,
			body
		})
		.then(res => res.json())
		.then(async r => {
		
			// request error
			if (r?.e) console.log(r.e);
		
			// request success
			else return await r;
		})
		.catch(() => {
			// request failed
		});
};
```

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
    }
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
		[portId: string]: JSON.stringify(portSettings) // Portfolio Settings Stringified
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
			/** Binance */
			bin: {
			    /** holdings on exchange */
                            holdings: JSON.stringify({ [sy: string]: number }),
			    /** positive numbers for buy, negative for sell */
  			    trades?: JSON.stringify({ [sy: string]: number }),
			    /** Time traded last ms */
                            lastTraded?: number,
			    /** Next trade chech ms */
                            nextCheck: number,
                        }
		}
	}
}

error: `no_trades`
```

### Portfolio New
Create a new portfolio and get portfolio ID
endPoint `portfolios/add`
```
body: {}

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
    w: JSON.stringify(portSettings), // Portfolio Settings Stringified
}

response: {
    ok: 1
}
```

### Portfolio Exchange APIs
Add or update exchange API keys for a given exchange
endPoint `portfolios/api`
```
body: {
    portId: string, // Portfolio Id String
    exch: `bin`, // exchange name, currently limited to `bin` (Binance)
    k1: Exchange_API_Key,
    k2: Exchange_API_Secret,
}

response: {
    ok: 1
}
```
