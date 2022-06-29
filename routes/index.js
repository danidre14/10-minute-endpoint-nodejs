const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Log = require("../models/Log");


router.get("/", async (req, res) => {
    const userData = req.session.userData;

    if (userData.endpoint.param === null) {
        const endpoint = await createEndPoint();

        userData.endpoint = endpoint;
    }

    const user = await User.findById(userData.endpoint.param);

    if (!user) {
        delete req.session.userData;
        return res.redirect("/");
    }

    const logs = await Log.findByUserId(userData.endpoint.param);

    const baseUrl = req.protocol + "://" + req.get("host");
    const endpointUrl = baseUrl + "/endpoint/" + userData.endpoint.param;
    const duetime = userData.endpoint.expires;

    const vars = { endpointUrl, duetime, logs, endpointParam: userData.endpoint.param };

    res.render("index", vars);
});

async function createEndPoint() {
    const user = await User.createUser();

    const param = user.id;
    const expires = user.expiresAt.getTime();

    return { param, expires };
}

module.exports = router;