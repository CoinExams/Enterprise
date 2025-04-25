import { EVMAddress, PayTxsData } from "merchantslate";
import { ResultPromise } from "./types";
declare const 
/** Payment for Portfolio */
payPortfolio: (quantity?: string) => ResultPromise<PayTxsData>, 
/** Payment Validation */
payPortfolioValid: (payingWallet: EVMAddress) => ResultPromise<string>, 
/**
* Portfolio payment done :
* Add time to portfolio
* @returns
* */
payDone: (payingWallet: string, portId: string) => ResultPromise<number>;
export { payPortfolio, payPortfolioValid, payDone, };
