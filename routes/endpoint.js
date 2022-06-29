const rateLimit = require("express-rate-limit");
const { MemoryStore } = require("express-rate-limit");

const express = require("express");
const requestIp = require('request-ip');

const router = express.Router();

const User = require("../models/User");
const Log = require("../models/Log");

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	store: new MemoryStore(),
})

router.use("/:endpoint", apiLimiter, async (req, res) => {
    const endpoint = req.params.endpoint;
    const user = await User.findById(endpoint);

    if(!user)
        return res.status(404).json({});

    const clientIP = requestIp.getClientIp(req);

    const details = {
        clientIP,
        method: req.method,
        query: req.query,
        body: req.body,
        headers: req.headers
    }

    const log = await Log.createLog(endpoint, details);

    res.status(200).json(log);
});

module.exports = router;