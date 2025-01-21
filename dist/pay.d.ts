import { EVMAddress } from "merchantslate";
declare const 
/** Payment for Portfolio */
payPortfolio: () => Promise<import("merchantslate").PayTxsData | undefined>, 
/** Payment Validation */
payPortfolioValid: (payingWallet: EVMAddress) => Promise<string | undefined>;
export { payPortfolio, payPortfolioValid, };
