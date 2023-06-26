import { HttpClient } from "./base/httpClient";

export const httpGet = async (BASE_URL, ENDPOINT, OPTIONS = null) => {
    const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
    console.log(
        `${ENDPOINT}?${OPTIONS ? `${OPTIONS}&` : ""}api_key=${API_KEY}`
    );
    try {
        const response = await HttpClient(BASE_URL).get(
            `${ENDPOINT}?${OPTIONS ? `${OPTIONS}&` : ""}api_key=${API_KEY}`
        );

        return response.data;
    } catch (err) {
        return err;
    }
};
