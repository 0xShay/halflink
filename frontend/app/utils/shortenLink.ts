export async function shortenLink(longUrl: string): Promise<{
    shortUrl: string;
    manageUrl: string;
}> {
    let randomText = Math.random().toString(36).substring(2, 8);
    return {
        shortUrl: "https://halflink.example/" + randomText,
        manageUrl: "https://halflink.example/" + randomText + "/manage",
    }
}