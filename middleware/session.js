const crypto = require("crypto");

const isBot = require("isbot-fast");
const detector = require("spider-detector");

const express = require("express");
const router = express.Router();

// Access the session as req.session
router.get("/", detector.middleware(), function (req, res, next) {
    const isbot = isBot(req.get('user-agent'));
    if (!isbot && !req.isSpider()) {
        if (!req.session.userData) {
            const userData = {
                endpoint: {
                    param: null,
                    expires: null
                }
            };

            req.session.userData = userData;
        }

        return next();
    } else {
        res.render("error404");
    }
});

module.exports = router;