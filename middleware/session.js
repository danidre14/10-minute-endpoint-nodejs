const crypto = require("crypto");
const axios = require("axios").default;

const express = require("express");
const router = express.Router();

// Access the session as req.session
router.get('/', function (req, res, next) {
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
    console.log(req.session)
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
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