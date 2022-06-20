const crypto = require("crypto");

const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Log = require("../models/Log");


router.get("/", async (req, res) => {
    const usageData = req.session.usageData;

    if (usageData.endpoint.param === null) { // || User.isExpired(usageData.endpoint.param)) {
        const endpoint = await createEndPoint();

        usageData.endpoint = endpoint;
    }

    const user = await User.findById(usageData.endpoint.param);

    if (!user) {
        delete req.session.usageData;
        return res.redirect("/");
    }

    const logs = await Log.findByUserId(usageData.endpoint.param);

    const baseUrl = req.protocol + "://" + req.get("host");
    const endpointUrl = baseUrl + "/endpoint/" + usageData.endpoint.param;
    const duetime = usageData.endpoint.expires;

    const vars = { endpointUrl, duetime, logs, endpointParam: usageData.endpoint.param };

    res.render("index", vars);
});

async function createEndPoint() {
    const user = await User.createUser();

    const param = user.id;
    const expires = user.expiresAt.getTime();

    return { param, expires };
}

function endpointIsExpired(endpoint) {
    try {
        let duetime;
        if (endpoint.expiresAt)
            duetime = endpoint.expiresAt.getTime();
        else
            duetime = endpoint.expires;
        return Date.now() > duetime;
    } catch {
        return true;
    }
}


module.exports = router;