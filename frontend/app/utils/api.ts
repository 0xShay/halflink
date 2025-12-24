import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const FRONTEND_BASE_URL = "http://localhost:3000";

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
    } = res.data;

    return {
        shortUrl: API_BASE_URL + "/l/" + sl.code,
        manageUrl: FRONTEND_BASE_URL + "/manage/" + sl.id,
    }
}

export async function getLinkInfo(id: string): Promise<{
    shortUrl: string;
    manageUrl: string;
    title: string;
    createdAt: string;
    clicks: number;
}> {
    let res = await axios.get(API_BASE_URL + "/l/info/" + id);

    let sl: {
        id: string;
        url: string;
        code: string;
        title: string;
        createdAt: string;
        clicks: number;
    } = res.data;

    return {
        title: sl.title,
        shortUrl: API_BASE_URL + "/l/" + sl.code,
        manageUrl: FRONTEND_BASE_URL + "/manage/" + sl.id,
        createdAt: sl.createdAt,
        clicks: sl.clicks,
    }
}

export async function deleteLink(id: string): Promise<void> {
    await axios.delete(API_BASE_URL + "/l/" + id);
}