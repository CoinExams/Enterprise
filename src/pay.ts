import { EVMAddress, payValidation, payTxs } from "merchantslate";
import { getConfig, invalidStr, logErr, requestFun } from "./config";

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
    },

    /**
    * Portfolio payment done :
    * Add time to portfolio
    * @returns 
    * */
    payDone = async (
        /** User wallet address (for payment validation) */
        payingWallet: string,
        /** Portfolio Id */
        portId: string
    ) => {
        const endPoint = `portfolios/pay`;
        try {
            const data = invalidStr([portId, payingWallet]) ? undefined
                : await requestFun(
                    endPoint,
                    {
                        portId,
                        payingWallet
                    }
                );
            return data
        } catch (e) {
            logErr(e, endPoint);
            return
        };
    };

export {
    payPortfolio,
    payPortfolioValid,
    payDone,
};