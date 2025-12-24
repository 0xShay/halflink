import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export async function shortenLink(longUrl: string): Promise<{
    shortUrl: string;
    manageUrl: string;
}> {
    let res = await axios.post(API_BASE_URL + "/l", {
        url: longUrl,
        title: "Unnamed",
    });

    let sl: {
        id: string;
        url: string;
        code: string;
        title: string;
        createdAt: string;
        clicks: number;
    } = res.data

    return {
        shortUrl: API_BASE_URL + "/l/" + sl.code,
        manageUrl: API_BASE_URL + "/l/" + sl.code + "/manage",
    }
}