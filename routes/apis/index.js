const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Log = require("../../models/Log");

router.get("/logs/:endpoint", async function (req, res) {
    const endpoint = req.params.endpoint;
    const user = await User.findById(endpoint);

    if (!user)
        return res.status(404).json({});

    const logs = await Log.findByUserId(endpoint);

    res.status(200).json(logs);
});

module.exports = router;