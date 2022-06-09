const crypto = require("crypto");

const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Log = require("../models/Log");


router.get("/", async (req, res) => {
    const usageData = req.session.usageData;

    if (usageData.endpoint.param === null) { // || endpointIsExpired(usageData.endpoint)) {
        const endpoint = await createEndPoint();

        usageData.endpoint = endpoint;
    }

    console.log(usageData.endpoint.param)

    const user = await User.findById(usageData.endpoint.param);
    const logs = await Log.findByUserId(usageData.endpoint.param);

    const baseUrl = req.protocol + "://" + req.get("host");
    const endpointUrl = baseUrl + "/endpoint/" + usageData.endpoint.param;
    const duetime = usageData.endpoint.expires;

    const vars = { endpointUrl, duetime, user, logs };

    res.render("index", vars);
});

async function createEndPoint() {
    const user = await User.create();
    
    const param = user.id;
    const expires = user.expiresAt.getTime();

    return { param, expires };
}

function endpointIsExpired(endpoint) {
    try {
        return Date.now() > endpoint.expires;
    } catch {
        return true;
    }
}


module.exports = router;