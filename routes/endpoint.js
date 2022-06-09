const express = require("express");
const cors = require("cors");
const requestIp = require('request-ip');

const router = express.Router();

const User = require("../models/User");
const Log = require("../models/Log");

router.use("/:endpoint", cors(), async (req, res) => {
    const endpoint = req.params.endpoint;
    const user = await User.findById(endpoint);

    if(!user)
        res.status(404).end();

    const clientIP = requestIp.getClientIp(req);

    const details = {
        clientIP,
        method: req.method,
        query: req.query,
        body: req.body,
        headers: req.headers
    }

    const log = await Log.create(endpoint, details);

    res.status(200).json(log);
    console.log(log);
});

module.exports = router;