import express from 'express';
import URL from '../schema/url.js';
import handleGenerateNewUrl from '../controllers/url.js';
const router = express.Router();


router.get('/', async (req, res) => {
    return res.render("home")
});

router.post('/', handleGenerateNewUrl);

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    console.log("WORKING");
    
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { 
                $push: {
                    visitHistory: {
                        timestamp: Date.now(), 
                    },
                },
            },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Optional: Log the redirect for analytics
        console.log(`Redirecting to: ${entry.redirectURL}`);

        // Redirect to the original URL
        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error in short URL redirect:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
