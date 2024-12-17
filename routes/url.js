import express from 'express';
import handleGenerateNewUrl from '../controllers/url.js';
import URL from '../schema/url.js';
const router = express.Router();

router.post('/', handleGenerateNewUrl);


export default router;
