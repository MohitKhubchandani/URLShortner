import express from 'express';
import urlRoute from './routes/url.js'
import connectDB from './configs/connect.js';
import path from 'path'
import { DB_URL } from './configs/serverConfig.js';
import handleGenerateNewUrl from './controllers/url.js';

const app = express();

const PORT = 8001;

connectDB(DB_URL)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use('/url', urlRoute);

app.post('/url', handleGenerateNewUrl);


app.listen(PORT, () => console.log(`Server Started at PORT :- ${PORT}` )
)