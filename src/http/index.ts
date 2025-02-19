import axios from "axios";

const GOOGLE_APP_SCRIPT = "https://script.google.com/macros/s/AKfycbyWSobB5oTa_W6wXkIVveSl_d3BhddDqWHXCVSpncJsbV_pqlgQIvLL3JwYsNkm4s31Kg/exec?";
const AWS_LAMBDA = "https://6zhsyas2r9.execute-api.ap-southeast-1.amazonaws.com/default/Backtest_strategy_update_data";

export const fetchToken = async () => {
    return await axios.get(`${GOOGLE_APP_SCRIPT}action=readTokens`);
};

export const fetchTokenDataByYear = async (token: string, year: number | string) => {
    if (year === "") year = new Date().getFullYear();

    return await axios.get(`${GOOGLE_APP_SCRIPT}action=readYear&token=${token}&year=${year}`);
};

export const mutationUpdateData = async (token: string, lastDate: string) => {
    try {
        const res = await axios.post(
            AWS_LAMBDA,
            { token, lastDate }, // Send as an object (no need to stringify manually)
            {
                headers: {
                    "Content-Type": "application/json", // Important: Set correct header
                },
            }
        );
        return res.data;
    } catch (error: any) {
        console.error("Error in mutationUpdateData:", error.response ? error.response.data : error.message);
        throw error;
    }
};
