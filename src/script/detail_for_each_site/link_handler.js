import { readFile, writeFile, appendFile } from "fs/promises";

async function resolveDOI(link) {
    try {
        const url = new URL(link);
        const doi = url.pathname.substring(1);
        // Construct the URL for the DOI resolver API
        const apiURL = `https://api.crossref.org/works/${encodeURIComponent(
            doi
        )}`;
        const res = await fetch(apiURL);
        const json = await res.json();
        const publisher = json.message.publisher;
        console.log(publisher, link);
        if (publisher.includes("Springer")) {
            return "springer";
        }
        if (publisher.includes("Hindawi")) {
            return "hindawi";
        }
        return "other";
    } catch (error) {
        return "other";
    }
}

async function handler(link) {
    if (link.includes("doi.org")) {
        return await resolveDOI(link);
    }
    if (link.includes("springer")) {
        return "springer";
    }
    if (link.includes("hindawi")) {
        return "hindawi";
    }
    return "other";
}

export default handler;
