import { EVMAddress, payValidation, payTxs } from "merchantslate";
import { getConfig } from "./config";

const
    /** Payment for Portfolio */
    payPortfolio = async () => {
        const
            data = getConfig(),
            payChain = data?.payChain,
            payId = data?.payId;
        if (!payChain || !payId) return
        const txs = await payTxs(payChain, payId);
        if (txs.success)
            return txs?.data
    },
    /** Payment Validation */
    payPortfolioValid = async (
        payingWallet: EVMAddress
    ) => {
        const
            data = getConfig(),
            payChain = data?.payChain,
            payId = data?.payId;
        if (!payChain || !payId) return
        const validation = await payValidation({
            chain: payChain,
            productId: payId,
            walletAddress: payingWallet,
        });
        return validation?.success ? validation?.data
            : undefined
    };

export {
    payPortfolio,
    payPortfolioValid,
};