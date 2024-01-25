    const { HandleGenrateNewShortUrl ,HandleGetAllGenratedUrl ,HandleRedirectUrl, HandleGetAnalytics } = require('../controllers/url');
const { restrictedToLoggedInUserOnly } = require('../middlewares/auth');
    const router = require('express').Router();

    router
    .post("/",restrictedToLoggedInUserOnly ,  HandleGenrateNewShortUrl)
    .get("/",restrictedToLoggedInUserOnly ,HandleGetAllGenratedUrl)


    router
    .get("/:ShortId",HandleRedirectUrl)

    router
    .get("/analytics/:id" , restrictedToLoggedInUserOnly ,HandleGetAnalytics)

    module.exports = router;