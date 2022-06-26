const crypto = require("crypto");

const isBot = require("isbot-fast");
const detector = require("spider-detector");

const express = require("express");
const router = express.Router();

// Access the session as req.session
router.get("/", detector.middleware(), function (req, res, next) {
    const isbot = isBot(req.get('user-agent'));
    if (!isbot && !req.isSpider()) {
        if (!req.session.usageData) {
            const usageData = {
                token: generateUserToken(),
                endpoint: {
                    param: null,
                    expires: null
                }
            };

            req.session.usageData = usageData;
        }

        return next();
    } else {
        res.render("error404");
    }
})

const userTokens = {};
function generateUserToken() {
    let token;
    do {
        token = crypto.randomBytes(30).toString('hex');
    } while (userTokens[token]);

    userTokens[token] = {};

    return token;
}

module.exports = router;