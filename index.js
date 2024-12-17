import express from 'express';
import urlRoute from './routes/url.js'
import connectDB from './connect.js';
import dotenv from 'dotenv';
import URL from './schema/url.js';

dotenv.config();
const app = express();

const PORT = 8001;

connectDB(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        
    })
    .catch(error => {
        console.error("Failed to connect to database:", error);
    });

app.use(express.json());
app.use('/', urlRoute);

app.get('/:shortId', async (req, res) => {
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
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error in short URL redirect:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(PORT, () => console.log(`Server Started at PORT :- ${PORT}` )
)