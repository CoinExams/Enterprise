import { EVMAddress } from "merchantslate";
declare const 
/** Payment for Portfolio */
payPortfolio: () => Promise<import("merchantslate").PayTxsData | undefined>, 
/** Payment Validation */
payPortfolioValid: (payingWallet: EVMAddress) => Promise<string | undefined>, 
/**
* Portfolio payment done :
* Add time to portfolio
* @returns
* */
payDone: (payingWallet: string, portId: string) => Promise<any>;
export { payPortfolio, payPortfolioValid, payDone, };
