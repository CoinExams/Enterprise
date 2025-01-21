import { PortfolioExchAPI, PortSettings, ExchDataAll, PortSettingsAll, PortfolioUpdate, PortfolioExchAPIReturn, PortfolioExchAPIError, PortfolioTradesError, PortfolioId } from "./types";
declare const 
/**
 * Portfolios Settings :
 * Latest settings for all portfolios
 * or pass a single portfolio portfolio Id portId for specific data
 * @returns empty object when no portfolios
 * */
portfolioSettings: (portId?: string) => Promise<PortSettingsAll>, 
/**
 * Portfolios Trades :
 * Latest trades for all portfolios
 * or pass a single portfolio portfolio Id portId for specific data
 * @returns empty object when no trades
 * */
portfolioTrades: (portId?: string) => Promise<ExchDataAll | PortfolioTradesError | undefined>, 
/**
 * Portfolio New :
 * Create a new portfolio and get portfolio ID
 * @returns new portfolio id string
 * */
portfolioNew: (payingWallet: string, portSettings?: PortSettings) => Promise<PortfolioId | undefined>, 
/**
 * Portfolio Update :
 * Update an existing portfolio using portfolio ID
 * @returns portfolio id string
 * */
portfolioUpdate: ({ portId, portSettings, }: PortfolioUpdate) => Promise<PortfolioId | undefined>, 
/**
 * Portfolio Exchange APIs :
 * Add or update exchange API keys for a given exchange
 * @returns portfolio id string and holdings on exchange
 * */
portfolioExchAPI: ({ portId, exchId, key1, key2, }: PortfolioExchAPI) => Promise<PortfolioExchAPIReturn | PortfolioExchAPIError | undefined>, 
/**
 * Portfolio Delete :
 * Delete an existing portfolio using portfolio ID
 * @returns portfolio id string
 * */
portfolioDelete: (portId: string) => Promise<PortfolioId | undefined>;
export { portfolioSettings, portfolioTrades, portfolioNew, portfolioUpdate, portfolioExchAPI, portfolioDelete, };
