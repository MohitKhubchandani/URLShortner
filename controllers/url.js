import { nanoid } from "nanoid";
import URL from "../schema/url.js";


async function handleGenerateNewUrl(req, res) {
    
    const body = req.body;
    if (!body.url) return res.status(400).json({error: "url is required"})
    const shortID = nanoid(8);
    
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    return res.render('shortUrl', { shortID });
};

export default handleGenerateNewUrl; 