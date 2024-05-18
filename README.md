# CoinExams Enterprise API

## Setup
CoinExams API uses HMAC authentcation to protect the data in transit. Thus, it is required to include the API key in request body and sign all requests with HMAC key. All requests are using POST method for ease, reliablity, and security.
### Base URL
```
cosnt baseURL = https://api.coinexams.com/v1/
```
### Request Signed
```
import { createHmac } from 'node:crypto';
const
    endPoint = `End Point`,
    hmacKey = `API HMAC Key`,
    bodyParm = {
        key: `API Key`,
        // ...body parameters
    },
    body = JSON.stringify(bodyParm)
    coinexams_sig = createHmac(`sha256`, hmacKey)
        .update(body)
        .digest(`hex`),
    headers = {
        coinexams_sig,
        "Content-Type": "application/json"
    },
    response = await fetch(baseURL + endPoint, {
				method: "POST",
				mode: "cors",
				headers,
				body
			})
				.then(res => res.json())
				.then(async r => {

                    // request error
					if (r?.e) console.log(r.e);

                    // request sucess
					else return await r;
				})
				.catch(() => {
					// request failed
				});
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

### Get All Portfolios
baseURL `portfolios/all`
```
body: {}

response: {
    users: {
        [portId: string]: {
            settings: JSON.stringify(portSettings), // Portfolio Settings Stringified
            updated: number, // last time updated
            exchanges: { // exchanges object
                binance: { // exchange holdings
                    [sy: string]: number // coin amount
                }
            }
        }
    }
}
```

### Portfolio Update
baseURL `portfolios/update`
```
body: {
    portId: portId, // Portfolio Id String
    w: JSON.stringify(portSettings), // Portfolio Settings Stringified
}

response: {
    ok: 1
}
```
